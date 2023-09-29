using System.Linq.Expressions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Domain.Entities.Reports;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Queries.GetPublicReports;
public class GetPublicReportsQuery : IRequest<(Result, List<PublicReportDto>?)>
{
}

public class GetPublicReportsQueryHandler : IRequestHandler<GetPublicReportsQuery, (Result, List<PublicReportDto?>)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<GetPublicReportsQuery> _logger;

    public GetPublicReportsQueryHandler(IApplicationDbContext context, ILogger<GetPublicReportsQuery> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(Result, List<PublicReportDto?>)> Handle(GetPublicReportsQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var reports = await _context.Reports
                .Include(x => x.Occurrence)
                    .ThenInclude(x => x.Reports.Where(r => !r.IsDeleted))
                        .ThenInclude(e => e.Disease)
                .Include(x => x.Occurrence)
                    .ThenInclude(o => o.Region)
                        .ThenInclude(e => e.Country)
                .Include(x => x.Disease)
                .Where(x => !x.IsDeleted && x.IsVerified && x.Created >= DateTime.UtcNow.Date.AddMonths(-1))
                .Select(ReportSelectorExpression())
                .ToListAsync();

            return (Result.Success(), reports);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return (Result.Failure(new List<string> { ex.Message }), null);
        }
    }

    private Expression<Func<Report, PublicReportDto>> ReportSelectorExpression()
    {
        return e => new PublicReportDto
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
