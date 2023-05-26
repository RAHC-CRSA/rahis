using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Reports;
using RegionalAnimalHealth.Domain.Entities.Reports;
using RegionalAnimalHealth.Domain.Enums;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Commands.CreateReport;
public class CreateReportCommand : IRequest<(Result, ReportDto?)>
{
    public long? OccurrenceId { get; set; }
    public long? RegionId { get; set; }
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
    public ReportType ReportType { get; set; }
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
    public DateOnly OccurenceDate { get; set; }

    public List<DiagnosticTestDto> DiagnosticTests { get; set; }
    public List<MedicationDto> Medications { get; set; }
    public List<VaccinationDto> Vaccinations { get; set; }
}

public class CreateReportCommandHandler : IRequestHandler<CreateReportCommand, (Result, ReportDto?)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<CreateReportCommand> _logger;

    public CreateReportCommandHandler(IApplicationDbContext context, ILogger<CreateReportCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(Result, ReportDto?)> Handle(CreateReportCommand request, CancellationToken cancellationToken)
    {
        try
        {
            Occurrence? occurrence;
            if (request.OccurrenceId == null)
            {
                // TODO: Get occurrence date from request
                occurrence = Occurrence.Create((long)request.RegionId, DateOnly.FromDateTime(DateTime.UtcNow));
                await _context.Occurrences.AddAsync(occurrence);
                await _context.SaveChangesAsync(cancellationToken);
            }
            else
            {
                occurrence = await _context.Occurrences.Where(x => !x.IsDeleted && x.Id == request.OccurrenceId).FirstOrDefaultAsync();

            }

            if (occurrence == null)
            {
                var message = "Failed to create or find occurrence.";
                _logger.LogDebug(message, request.OccurrenceId);
                return (Result.Failure(new List<string> { message }), null);
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
            if (request.Treatment && request.Medications.Any())
            {
                foreach (var item in request.Medications)
                {
                    report.AddMedication(item.Name, item.Dosage);
                }
            }

            if (request.DiagnosticTests.Any())
            {
                foreach (var test in request.DiagnosticTests)
                {
                    report.AddDiagnosticTest(test.Name, test.NumberTested, test.ProfessionalId);
                }
            }

            if (request.Vaccinations.Any())
            {
                foreach (var vacc in request.Vaccinations)
                {
                    report.AddVaccination(vacc.Name, vacc.NumberVaccinated, vacc.IsHuman, vacc.IsAnimal, vacc.ProfessionalId);
                }
            }


            await _context.Reports.AddAsync(report);

            await _context.SaveChangesAsync(cancellationToken);

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