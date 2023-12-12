using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Reports;
using RegionalAnimalHealth.Domain.Enums;
using RegionalAnimalHealth.Domain.Models.Messaging;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Commands.UpdateReport;
public class UpdateReportCommand : IRequest<Result>
{
    public long Id { get; set; }
    public int NumberExposed { get; set; }
    public int NumberInfected { get; set; }
    public int Dead { get; set; }
    public int Mortality { get; set; }
    public bool HumanInfection { get; set; }
    public int? HumansInfected { get; set; }
    public int? HumansExposed { get; set; }
    public int? HumansMortality { get; set; }
    public bool? StampingOut { get; set; }
    public bool? DestructionOfCorpses { get; set; }
    public int? CorpsesDestroyed { get; set; }
    public bool? Disinfection { get; set; }
    public bool? Observation { get; set; }
    public string? ObservationDuration { get; set; }
    public bool Quarantine { get; set; }
    public string? QuarantineDuration { get; set; }
    public bool MovementControl { get; set; }
    public string? MovementControlMeasures { get; set; }
    public bool Treatment { get; set; }
    public string? TreatmentDetails { get; set; }

    public List<DiagnosticTestDto> DiagnosticTests { get; set; }
    public List<MedicationDto> Medications { get; set; }
    public List<VaccinationDto> Vaccinations { get; set; }
}

public class UpdateReportCommandHandler : IRequestHandler<UpdateReportCommand, Result>
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

    public async Task<Result> Handle(UpdateReportCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var report = await _context.Reports.Where(x => !x.IsDeleted && x.Id == request.Id).FirstOrDefaultAsync();
            if (report == null)
                return Result.Failure(new List<string> { "Report not found." });

         //   report.Verify(request.CvoComment, request.IsVerified, request.ReportStatus);


            // Update infection info
            // report.UpdateInfectionInfo(request.NumberExposed, request.NumberInfected, request.Mortality, request.HumanInfection,
            //     request.HumansExposed, request.HumansInfected, request.HumansMortality);

                            report.UpdateInfectionInfo(request.NumberExposed, request.NumberInfected, request.Dead, request.Mortality, request.HumanInfection,
                request.HumansExposed);

            // Update treatment info
            report.UpdateTreatmentInfo(request.StampingOut ?? report.StampingOut,
            request.DestructionOfCorpses ?? report.DestructionOfCorpses,
            request.CorpsesDestroyed,
            request.Disinfection ?? report.Disinfection,
            request.Observation ?? report.Observation, request.ObservationDuration,
            request.Quarantine, request.QuarantineDuration,
            request.MovementControl,
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



            _context.Reports.Update(report);
            // Save changes
            await _context.SaveChangesAsync(cancellationToken); 

            // Notify reporter
            var (_, user) = await  _identityService.GetUserAsync(_currentUserService?.UserId);

            var subject = $"Report Submitted";
            var content = $"You have successfully submitted a report.";
            var message = EmailNotification.Create(content, user.Email, subject, user.FirstName);

            var emailResult = await _emailService.SendEmailAsync(message, EmailNotification.TemplateId);

            return Result.Success();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return Result.Failure(new List<string> { ex.Message });
        }
    }
}
