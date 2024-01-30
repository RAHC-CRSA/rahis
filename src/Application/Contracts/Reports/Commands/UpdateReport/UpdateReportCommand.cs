using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Reports;
using RegionalAnimalHealth.Domain.Entities.Reports;
using RegionalAnimalHealth.Domain.Enums;
using RegionalAnimalHealth.Domain.Models.Messaging;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Commands.UpdateReport;
public class UpdateReportCommand : IRequest<(Result, ReportDto?)>
{
    public long Id { get; set; }
    public int NumberExposed { get; set; }
    public int NumberInfected { get; set; }
    public int Dead { get; set; }
    public int Mortality { get; set; }
    public int MortalityRate { get; set; }
    public bool HumanInfection { get; set; }
    public int? HumansInfected { get; set; }
    public int? HumansExposed { get; set; }
    public bool IsOngoing { get; set; }
    public bool IsVerified { get; set; }
    public ReportType? ReportType { get; set; }
    public decimal? Longitude { get; set; }
    public decimal? Latitude { get; set; }
    public string? ControlMeasuresCode { get; set; }
    public bool StampingOut { get; set; }
    public bool DestructionOfCorpses { get; set; }
    public int? CorpsesDestroyed { get; set; }
    public bool Disinfection { get; set; }
    public bool Observation { get; set; }
    public string? ObservationDuration { get; set; }
    public bool Quarantine { get; set; }
    public string? QuarantineDuration { get; set; }
    public bool MovementControl { get; set; }
    public string? MovementControlMeasures { get; set; }
    public bool Treatment { get; set; }
    public string? TreatmentDetails { get; set; }
    public DateOnly OccurenceDate { get; set; }

    public List<DiagnosticTestDto> DiagnosticTests { get; set; }
    public List<MedicationDto> Medications { get; set; }
    public List<VaccinationDto> Vaccinations { get; set; }
}

public class UpdateReportCommandHandler : IRequestHandler<UpdateReportCommand, (Result, ReportDto?)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<UpdateReportCommand> _logger;
    private readonly IIdentityService _identityService;
    private readonly ICurrentUserService _currentUserService;
    private readonly IEmailService _emailService;
    

    public UpdateReportCommandHandler(IApplicationDbContext context,  IIdentityService identityService, ICurrentUserService currentUserService, IEmailService emailService, ILogger<UpdateReportCommand> logger)
    {
        _context = context;
        _logger = logger;
        _identityService = identityService;
        _currentUserService = currentUserService;
        _emailService = emailService;
    }

    public async Task<(Result, ReportDto?)> Handle(UpdateReportCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var report = await _context.Reports.Where(x => !x.IsDeleted && x.Id == request.Id).FirstOrDefaultAsync();
            if (report == null)
                return (Result.Failure(new List<string> { "Report not found." }), null);

            // Get latest report if any
            Report? latestReport = await _context.Reports.Where(x => !x.IsDeleted && x.OccurrenceId == report.OccurrenceId).OrderByDescending(r => r.Created).FirstOrDefaultAsync();

            // Update control measures
            ControlMeasure? controlMeasures = null;
            if (request.ControlMeasuresCode != null)
            {
                controlMeasures = await _context.ControlMeasures.Where(x => !x.IsDeleted & x.Code == request.ControlMeasuresCode).FirstOrDefaultAsync();

                if (controlMeasures != null)
                {
                    report.UpdateControlMeasures(controlMeasures.Id);
                }
            }

            // Get transboundary disease if any
            TransboundaryDisease? transboundaryDisease = await _context.TransboundaryDiseases
                .Where(x => !x.IsDeleted && x.SpeciesId == report.SpeciesId && x.DiseaseId == report.DiseaseId)
                .FirstOrDefaultAsync();

            // Update report status
            report.UpdateReportStatus();

            // Update infection info
            report.UpdateInfectionInfo(request.NumberExposed, request.NumberInfected, request.Dead, request.Mortality, request.HumanInfection,
                request.HumansExposed);

            // Update treatment info
            report.UpdateTreatmentInfo(request.StampingOut, request.DestructionOfCorpses, request.CorpsesDestroyed, request.Disinfection,
                request.Observation, request.ObservationDuration, request.Quarantine, request.QuarantineDuration, request.MovementControl,
                request.MovementControlMeasures, request.Treatment, request.TreatmentDetails);


            // TODO: Add treatments, tests and vaccinations
            if (request.Treatment)
            {
                report.UpdateTreatmentDetails(request.TreatmentDetails);
                if (request.Medications.Any())
                {
                    foreach (var item in request.Medications)
                    {
                        report.AddMedication(item.Name, item.Dosage);
                    }
                }
            }

            if (request.DiagnosticTests.Any())
            {
                foreach (var test in request.DiagnosticTests)
                {
                    report.AddDiagnosticTest(test.Name, test.NumberTested, test.NumberPositive, test.ProfessionalId, test.TestResultImage);
                }
            }

            if (request.Vaccinations.Any())
            {
                foreach (var vacc in request.Vaccinations)
                {
                    report.AddVaccination(vacc.Name, vacc.NumberVaccinated, vacc.IsHuman, vacc.IsAnimal, vacc.ProfessionalId);
                }
            }

            // Calculate notifiable points
            var notifiabilityPoints = 0;
            // Get report disease
            var disease = await _context.Diseases.Where(x => !x.IsDeleted && x.Id == report.DiseaseId).FirstOrDefaultAsync();

            // Immediate notification points
            notifiabilityPoints += report.ReportType == ReportType.Immediate ? 1 : 0;

            // Notifiable disease points
            notifiabilityPoints += disease != null && disease.IsNotifiable ? 2 : 0;

            // Monitored disease points
            notifiabilityPoints += disease != null && disease.IsMonitored ? 1 : 0;

            // Transboundary disease points
            notifiabilityPoints += transboundaryDisease == null ? 2 : 0;

            // Mortality points
            if (latestReport != null)
            {
                // Animal mortality points
                notifiabilityPoints += request.Mortality > latestReport.Mortality ? request.Mortality > (latestReport.Mortality / 2) ? 2 : 1 : 0;
            }

            // Calculate notifiability points out of 10
            notifiabilityPoints = (int)Math.Round(notifiabilityPoints / 8.0 * 10);

            // Set notifiable points for report
            report.SetNotifiabilityPoints(notifiabilityPoints);

            // TODO: Send email notifications

            // Save changes
            await _context.SaveChangesAsync(cancellationToken);

            // Notify reporter
            var (_, user) = await _identityService.GetUserAsync(_currentUserService?.UserId);

            var subject = $"Report Updated";
            var content = $"You have successfully updated a report.";
            var message = EmailNotification.Create(content, user.Email, subject, user.FirstName);

            var emailResult = await _emailService.SendEmailAsync(message, EmailNotification.TemplateId);

            var data = new ReportDto
            {
                Id = report.Id,
                OccurrenceId = report.OccurrenceId,
                DiseaseId = report.DiseaseId,
                SpeciesId = report.SpeciesId,
                Exposed = report.NumberExposed,
                Infected = report.NumberInfected,
                IsOngoing = report.IsOngoing,
                IsVerified = report.IsVerified,
                StampingOut = report.StampingOut,
                DestructionOfCorpses = report.DestructionOfCorpses,
                Disinfection = report.Disinfection,
                Observation = report.Observation,
                Quarantine = report.Quarantine,
                MovementControl = report.MovementControl,
                Treatment = report.Treatment,
                ControlMeasuresCode = controlMeasures?.Code,
                ControlMeasuresId = controlMeasures?.Id,
            };

            return (Result.Success(), data);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return (Result.Failure(new List<string> { ex.Message }), null);
        }
    }
}
