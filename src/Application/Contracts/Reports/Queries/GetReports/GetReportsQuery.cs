using System.Linq.Expressions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Domain.Entities.Reports;
using RegionalAnimalHealth.Domain.Enums;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Queries.GetReports;
public class GetReportsQuery : IRequest<(Result, List<ReportListDto>?)>
{
    public bool? IsVerified { get; set; }
    public long? CountryId { get; set; }
    public string? UserId { get; set; }
    // public ReportStatus? ReportStatus { get; set; }
}

public class GetReportsQueryHandler : IRequestHandler<GetReportsQuery, (Result, List<ReportListDto>?)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<GetReportsQuery> _logger;

    public GetReportsQueryHandler(IApplicationDbContext context, ILogger<GetReportsQuery> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(Result, List<ReportListDto>?)> Handle(GetReportsQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var reports = await _context.Reports
                .Include(x => x.Occurrence)
                    .ThenInclude(x => x.Reports.Where(r => !r.IsDeleted))
                        .ThenInclude(e => e.Disease)
                // .Include(x => x.ReportStatus)
                .Include(x => x.Occurrence)
                    .ThenInclude(o => o.Region)
                        .ThenInclude(e => e.Country)
                .Include(x => x.Disease)
                .Where(x => !x.IsDeleted &&
                    (request.IsVerified != null ? x.IsVerified == request.IsVerified : true) &&
                    (request.CountryId != null ? x.Occurrence.Country.Id == request.CountryId : true) &&
                    (request.UserId != null ? x.CreatedBy == request.UserId : true))
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

    private Expression<Func<Report, ReportListDto>> ReportSelectorExpression()
    {
        return e => new ReportListDto
        {
            Id = e.Id,
            OccurrenceTitle = $"{e.Occurrence.Reports.OrderBy(x => x.Id).Take(1).FirstOrDefault().Disease.Name ?? "Unidentified Disease"} / {e.Occurrence.DateStarted.ToString("MMMM dd, yyyy")}",
            IsVerified = e.IsVerified,
            Exposed = e.NumberExposed,
            Infected = e.NumberInfected,
            ReportStatus = e.ReportStatus,
            Mortality = e.Mortality,
            Location = $"{e.Occurrence.Region.Name}, {e.Occurrence.Region.Country.Name}",
            Created = DateOnly.FromDateTime(e.Created).ToString("MMMM dd, yyyy"),
            LastModified = DateOnly.FromDateTime(e.LastModified ?? e.Created).ToString("MMMM dd, yyyy"),
        };
    }
}
