using System.Linq.Expressions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Reports;
using RegionalAnimalHealth.Domain.Entities.Reports;
using RegionalAnimalHealth.Domain.Exceptions;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Queries.GetOccurrences;
public class GetOccurrencesQuery : IRequest<(Result, List<OccurrenceDto>?)>
{
    public long? CountryId { get; set; }
}

public class GetOccurrencesQueryHandler : IRequestHandler<GetOccurrencesQuery, (Result, List<OccurrenceDto>?)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<GetOccurrencesQuery> _logger;

    public GetOccurrencesQueryHandler(IApplicationDbContext context, ILogger<GetOccurrencesQuery> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(Result, List<OccurrenceDto>?)> Handle(GetOccurrencesQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var occurrence = await _context.Occurrences
                .Include(x => x.Reports.Where(r => !r.IsDeleted))
                    .ThenInclude(r => r.Disease)
                .Include(x => x.Region)
                    .ThenInclude(e => e.Country)
                .Where(x => !x.IsDeleted && (request.CountryId != null ? x.CountryId == request.CountryId : true))
                .Select(OccurrencesSelectorExpression())
                .ToListAsync();

            return (Result.Success(), occurrence);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return (Result.Failure(new List<string> { ex.Message }), null);
        }
    }

    private Expression<Func<Occurrence, OccurrenceDto>> OccurrencesSelectorExpression()
    {
        return e => new OccurrenceDto
        {
            Id = e.Id,
            Title = $"{e.Reports.FirstOrDefault().Disease.Name ?? "Unidentified Disease"} / {e.DateStarted.ToString("MMMM dd, yyyy")}",
            DateStarted = e.DateStarted.ToString("MMMM dd, yyyy"),
            DateEnded = e.DateEnded.Value.ToString("MMMM dd, yyyy"),
            Location = $"{e.Region.Name}, {e.Region.Country.Name}",
            Reports = e.Reports.Count()
        };
    }
}
