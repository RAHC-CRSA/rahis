using System.Linq.Expressions;
using System.Security.Cryptography.X509Certificates;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models.Reports;
using RegionalAnimalHealth.Application.Contracts.Reports.Queries.GetVaccinationTypes;
using RegionalAnimalHealth.Domain.Entities.Reports;
using RegionalAnimalHealth.Domain.Exceptions;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Queries.GetOccurrences;
public class GetOccurrencesQuery : IRequest<List<OccurrenceDto>>
{
}

public class GetOccurrencesQueryHandler : IRequestHandler<GetOccurrencesQuery, List<OccurrenceDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<GetOccurrencesQuery> _logger;

    public GetOccurrencesQueryHandler(IApplicationDbContext context, ILogger<GetOccurrencesQuery> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<List<OccurrenceDto>> Handle(GetOccurrencesQuery request, CancellationToken cancellationToken)
    {
        try
        {
            return await _context.Occurrences
                .Include(x => x.Reports.Where(r => !r.IsDeleted))
                    .ThenInclude(r => r.Disease)
                .Include(x => x.Region)
                    .ThenInclude(e => e.Country)
                .Where(x => !x.IsDeleted)
                .Select(OccurrencesSelectorExpression())
                .ToListAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            throw new BusinessRuleException(nameof(GetOccurrencesQuery), ex.Message);
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
