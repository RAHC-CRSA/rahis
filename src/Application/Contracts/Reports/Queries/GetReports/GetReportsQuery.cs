using System.Linq.Expressions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Contracts.Reports.Queries.GetOccurrences;
using RegionalAnimalHealth.Domain.Entities.Reports;
using RegionalAnimalHealth.Domain.Exceptions;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Queries.GetReports;
public class GetReportsQuery : IRequest<List<ReportListDto>>
{
}

public class GetReportsQueryHandler : IRequestHandler<GetReportsQuery, List<ReportListDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<GetReportsQuery> _logger;

    public GetReportsQueryHandler(IApplicationDbContext context, ILogger<GetReportsQuery> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<List<ReportListDto>> Handle(GetReportsQuery request, CancellationToken cancellationToken)
    {
        try
        {
            return await _context.Reports
                .Include(x => x.Occurrence)
                    .ThenInclude(x => x.Reports.Where(r => !r.IsDeleted))
                        .ThenInclude(e => e.Disease)
                .Include(x => x.Occurrence)
                    .ThenInclude(o => o.Region)
                        .ThenInclude(e => e.Country)
                .Include(x => x.Disease)
                .Where(x => !x.IsDeleted)
                .Select(ReportSelectorExpression())
                .ToListAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            throw new BusinessRuleException(nameof(GetReportsQuery), ex.Message);
        }
    }

    private Expression<Func<Report, ReportListDto>> ReportSelectorExpression()
    {
        return e => new ReportListDto
        {
            Id = e.Id,
            OccurrenceTitle = $"{e.Occurrence.Reports.OrderBy(x => x.Id).Take(1).FirstOrDefault().Disease.Name ?? "Unidentified Disease"} / {e.Occurrence.DateStarted.ToString("MMMM dd, yyyy")}",
            IsVerified = e.IsVerified,
            Exposed = e.NumberExposed,
            Infected = e.NumberInfected,
            Mortality = e.Mortality,
            Location = $"{e.Occurrence.Region.Name}, {e.Occurrence.Region.Country.Name}",
            Created = DateOnly.FromDateTime(e.Created).ToString("MMMM dd, yyyy")
        };
    }
}
