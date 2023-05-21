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
    private readonly ILogger<GetReportByIdQuery> _logger;

    public GetReportByIdQueryHandler(IApplicationDbContext context, ILogger<GetReportByIdQuery> logger)
    {
        _context = context;
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
                .Where(x => !x.IsDeleted && x.Id == request.ReportId)
                .Select(ReportSelectorExpression())
                .FirstOrDefaultAsync();

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
            OccurrenceTitle = $"{e.Occurrence.Reports.OrderBy(x => x.Id).Take(1).FirstOrDefault().Disease.Name ?? "Unidentified Disease"} / {e.Occurrence.DateStarted.ToString("MMMM dd, yyyy")}",
            Exposed = e.NumberExposed,
            Infected = e.NumberInfected,
            Mortality = e.Mortality,
            HumansExposed = e.HumansExposed,
            HumansInfected = e.HumansInfected,
            HumansMortality = e.HumansMortality,
            IsOngoing = e.IsOngoing,
            IsVerified = e.IsVerified,
            StampingOut = e.StampingOut,
            DestructionOfCorpses = e.DestructionOfCorpses,
            Disinfection = e.Disinfection,
            Observation = e.Observation,
            ObservationDuration = e.ObservationDuration,
            Quarantine = e.Quarantine,
            QuarantineDuration = e.QuarantineDuration,
            MovementControl = e.MovementControl,
            MovementControlMeasures = e.MovementControlMeasures,
            Treatment = e.Treatment,
            TreatmentDetails = e.TreatmentDetails,
            Location = $"{e.Occurrence.Region.Name}, {e.Occurrence.Region.Country.Name}",
            Created = DateOnly.FromDateTime(e.Created).ToString("MMMM dd, yyyy")
        };
    }
}
