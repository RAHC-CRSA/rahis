using System.Linq;
using System.Linq.Expressions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Reports;
using RegionalAnimalHealth.Domain.Entities.Reports;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Queries.GetReportById;
public class GetReportByIdQuery : IRequest<(Result, ReportDto?)>
{
    public long ReportId { get; set; }
}

public class GetReportByIdQueryHandler : IRequestHandler<GetReportByIdQuery, (Result, ReportDto?)>
{
    private readonly IApplicationDbContext _context;
    private readonly IIdentityService _identityService;
    private readonly ILogger<GetReportByIdQuery> _logger;

    public GetReportByIdQueryHandler(IApplicationDbContext context, IIdentityService identityService, ILogger<GetReportByIdQuery> logger)
    {
        _context = context;
        _identityService = identityService;
        _logger = logger;
    }

    public async Task<(Result, ReportDto?)> Handle(GetReportByIdQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var report = await _context.Reports
                .Include(x => x.Occurrence)
                    .ThenInclude(x => x.Reports.Where(r => !r.IsDeleted))
                        .ThenInclude(e => e.Disease)
                .Include(x => x.Occurrence)
                    .ThenInclude(o => o.Region)
                        .ThenInclude(e => e.Country)
                .Include(x => x.Disease)
                .Include(x => x.Species)
                // .Include(x => x.ReportStatus)
                .Include(x => x.DiagnosticTests.Where(t => !t.IsDeleted))
                    .ThenInclude(t => t.Professional)
                .Include(x => x.Medications.Where(m => !m.IsDeleted))
                .Include(x => x.Vaccinations.Where(v => !v.IsDeleted))
                    .ThenInclude(v => v.Professional)
                .Where(x => !x.IsDeleted && x.Id == request.ReportId)
                .Select(ReportSelectorExpression())
                .FirstOrDefaultAsync();

            var (result, reporter) = await _identityService.GetUserAsync(report.CreatedBy);

            if (result.Succeeded)
            {
                report.ReporterName = reporter.Name;
                report.ReporterEmail = reporter.Email;
            }


            return (Result.Success(), report);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return (Result.Failure(new List<string> { ex.Message }), null);
        }
    }

    private Expression<Func<Report, ReportDto>> ReportSelectorExpression()
    {
        return e => new ReportDto {
            Id = e.Id,
            OccurrenceId = e.OccurrenceId,
            OccurrenceTitle = $"{e.Occurrence.Reports.OrderBy(x => x.Id).Take(1).FirstOrDefault().Disease.Name ?? "Unidentified Disease"} / {e.Occurrence.DateStarted.ToString("MMMM dd, yyyy")}",
            OccurrenceRegion = $"{(e.Occurrence.Community != null ? $"{e.Occurrence.Community.Name}, " : string.Empty)}{(e.Occurrence.District != null ? $"{e.Occurrence.District.Name}, " : string.Empty)}{(e.Occurrence.Municipality != null ? $"{e.Occurrence.Municipality.Name}, " : string.Empty)}{e.Occurrence.Region.Name}, {e.Occurrence.Region.Country.Name}",
            OccurrenceCountryFlag = e.Occurrence.Region.Country.Flag,
            DiseaseName = e.Disease.Name,
            DiseaseId = e.DiseaseId,
            SpeciesName = e.Species.Name,
            SpeciesId = e.SpeciesId,
            NotifiabilityPoints = e.NotifiabilityPoints,
            IsDiseaseMonitored = e.Disease.IsMonitored,
            IsDiseaseNotifiable = e.Disease.IsNotifiable,
            Exposed = e.NumberExposed,
            Infected = e.NumberInfected,
            Mortality = e.Mortality,
            HumanInfection = e.HumanInfection,
            HumansExposed = e.HumansExposed,
            IsOngoing = e.IsOngoing,
            IsVerified = e.IsVerified,
            CvoComment = e.CvoComment,
            ReportStatus = e.ReportStatus,
            StampingOut = e.StampingOut,
            DestructionOfCorpses = e.DestructionOfCorpses,
            CorpsesDestroyed = e.CorpsesDestroyed,
            Disinfection = e.Disinfection,
            Observation = e.Observation,
            ObservationDuration = e.ObservationDuration,
            Quarantine = e.Quarantine,
            QuarantineDuration = e.QuarantineDuration,
            MovementControl = e.MovementControl,
            MovementControlMeasures = e.MovementControlMeasures,
            Treatment = e.Treatment,
            TreatmentDetails = e.TreatmentDetails,
            Tested = e.DiagnosticTests.Any(),
            DiagnosticTests = e.DiagnosticTests.AsQueryable().Select(DiagnosticTestSelectorExpression()).ToList(),
            Medications = e.Medications.AsQueryable().Select(MedicationSelectorExpression()).ToList(),
            Vaccinated = e.Vaccinations.Any(),
            Vaccinations = e.Vaccinations.AsQueryable().Select(VaccinationSelectorExpression()).ToList(),
            Location = $"{e.Occurrence.Region.Name}, {e.Occurrence.Region.Country.Name}",
            Created = DateOnly.FromDateTime(e.Created).ToString("MMMM dd, yyyy"),
            CreatedBy = e.CreatedBy
        };
    }

    private Expression<Func<DiagnosticTest, DiagnosticTestDto>> DiagnosticTestSelectorExpression()
    {
        return e => new DiagnosticTestDto
        {
            Id = e.Id,
            Name = e.Name,
            NumberTested = e.NumberTested,
            ProfessionalName = e.Professional.Name
        };
    }

    private Expression<Func<Medication, MedicationDto>> MedicationSelectorExpression()
    {
        return e => new MedicationDto
        {
            Id = e.Id,
            Name = e.Name,
            Dosage = e.Dosage,
        };
    }

    private Expression<Func<Vaccination, VaccinationDto>> VaccinationSelectorExpression()
    {
        return e => new VaccinationDto
        {
            Id = e.Id,
            Name = e.Name,
            NumberVaccinated = e.NumberVaccinated,
            IsAnimal = e.IsAnimal,
            IsHuman = e.IsHuman,
            ProfessionalName = e.Professional.Name
        };
    }
}
