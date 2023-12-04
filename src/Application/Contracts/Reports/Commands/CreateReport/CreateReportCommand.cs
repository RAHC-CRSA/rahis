using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Reports;
using RegionalAnimalHealth.Domain.Entities.Reports;
using RegionalAnimalHealth.Domain.Enums;
using RegionalAnimalHealth.Domain.Models.Messaging;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Commands.CreateReport;
public class CreateReportCommand : IRequest<(Result, ReportDto?)>
{
    public long? OccurrenceId { get; set; }
    public long CountryId { get; set; }
    public long RegionId { get; set; }
    public long? CommunityId { get; set; }
    public long? DistrictId { get; set; }
    public long? MunicipalityId { get; set; }
    public long DiseaseId { get; set; }
    public long SpeciesId { get; set; }
    public int NumberExposed { get; set; }
    public int NumberInfected { get; set; }
    public int Mortality { get; set; }
    public bool HumanInfection { get; set; }
    public int? HumansInfected { get; set; }
    public int? HumansExposed { get; set; }
    public int? HumansMortality { get; set; }
    public bool IsOngoing { get; set; }
    public bool IsVerified { get; set; }
    public ReportType? ReportType { get; set; }
    public decimal? Longitude { get; set; }
    public decimal? Latitude { get; set; }
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

public class CreateReportCommandHandler : IRequestHandler<CreateReportCommand, (Result, ReportDto?)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<CreateReportCommand> _logger;
    private readonly IIdentityService _identityService;
    private readonly ICurrentUserService _currentUserService;
    private readonly IEmailService _emailService;

    public CreateReportCommandHandler(IApplicationDbContext context, IIdentityService identityService, ICurrentUserService currentUserService, IEmailService emailService, ILogger<CreateReportCommand> logger)
    {
        _context = context;
        _logger = logger;
        _identityService = identityService;
        _currentUserService = currentUserService;
        _emailService = emailService;
    }

    public async Task<(Result, ReportDto?)> Handle(CreateReportCommand request, CancellationToken cancellationToken)
    {
        try
        {
            // Get latest report if any
            Report? latestReport = request.OccurrenceId != null ? await _context.Reports.Where(x => !x.IsDeleted && x.OccurrenceId == request.OccurrenceId).OrderByDescending(r => r.Created).FirstOrDefaultAsync() : null;

            // Get transboundary disease if any
            TransboundaryDisease? transboundaryDisease = await _context.TransboundaryDiseases
                .Where(x => !x.IsDeleted && x.SpeciesId == request.SpeciesId && x.DiseaseId == request.DiseaseId)
                .FirstOrDefaultAsync();

            int notifiabilityPoints = 0;
            Occurrence? occurrence;
            
            if (request.OccurrenceId == null)
            {
               
                // TODO: Get occurrence date from request
                occurrence = Occurrence.Create(request.CountryId, request.RegionId, request.MunicipalityId, request.DistrictId, request.CommunityId, DateOnly.FromDateTime(DateTime.UtcNow));

                if (transboundaryDisease != null)
                {
                    occurrence.SetTransboundaryDisease(transboundaryDisease.Id);
                }

                await _context.Occurrences.AddAsync(occurrence);
            }
            else
            {
                occurrence = await _context.Occurrences
                    .Include(o => o.Reports.Where(r => !r.IsDeleted))
                    .Where(x => !x.IsDeleted && x.Id == request.OccurrenceId)
                    .FirstOrDefaultAsync();
            }

            if (occurrence == null)
            {
                var msg = "Failed to create or find occurrence.";
                _logger.LogDebug(msg, request.OccurrenceId);
                return (Result.Failure(new List<string> { msg }), null);
            }

            // TODO: Get occurrence date from request

            // Create report
            var report = Report.Create(occurrence.Id, request.DiseaseId, request.SpeciesId, DateOnly.FromDateTime(DateTime.UtcNow));

            // Update infection info
            report.UpdateInfectionInfo(request.NumberExposed, request.NumberInfected, request.Mortality, request.HumanInfection,
                request.HumansExposed, request.HumansInfected, request.HumansMortality);

            // Update treatment info
            report.UpdateTreatmentInfo(request.StampingOut, request.DestructionOfCorpses, request.CorpsesDestroyed, request.Disinfection,
                request.Observation, request.ObservationDuration, request.Quarantine, request.QuarantineDuration, request.MovementControl,
                request.MovementControlMeasures, request.Treatment);


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
                    report.AddDiagnosticTest(test.Name, test.NumberTested, test.NumberPositive, test.NumberNegative, test.ProfessionalId);
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
            // Get report disease
            var disease = await _context.Diseases.Where(x => !x.IsDeleted && x.Id == request.DiseaseId).FirstOrDefaultAsync();

            // Immediate notification points
            notifiabilityPoints += request.ReportType == ReportType.Immediate ? 1 : 0;

            // Notifiable disease points
            notifiabilityPoints += disease != null && disease.IsNotifiable ? 2 : 0;

            // Monitored disease points
            notifiabilityPoints += disease != null && disease.IsMonitored ? 1 : 0;

            // Transboundary disease points
            notifiabilityPoints += transboundaryDisease == null ? 2 : 0;

            // Mortality points
            if (latestReport != null)
            {
                // Human mortality points
                notifiabilityPoints += request.HumansMortality > latestReport.HumansMortality ? request.HumansMortality > (latestReport.HumansMortality / 2) ? 2 : 1 : 0;

                // Animal mortality points
                notifiabilityPoints += request.Mortality > latestReport.Mortality ? request.Mortality > (latestReport.Mortality / 2) ? 2 : 1 : 0;
            }

            // Set notifiable points for report
            report.SetNotifiabilityPoints(notifiabilityPoints);

            // TODO: Send email notifications

            // Add report to occurrence
            occurrence.AddReport(report);

            // Save changes
            await _context.SaveChangesAsync(cancellationToken); 

            // Notify reporter
            var (_, user) = await  _identityService.GetUserAsync(_currentUserService?.UserId);

            var subject = $"Report Submitted";
            var content = $"You have successfully submitted a report.";
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