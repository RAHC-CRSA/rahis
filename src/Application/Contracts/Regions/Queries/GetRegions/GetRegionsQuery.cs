using System.Linq.Expressions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models.Regions;
using RegionalAnimalHealth.Domain.Entities.Regions;
using RegionalAnimalHealth.Domain.Exceptions;

namespace RegionalAnimalHealth.Application.Contracts.Regions.Queries.GetRegions;
public class GetRegionsQuery : IRequest<List<RegionDto>>
{
    public long? CountryId { get; set; }
}

public class GetRegionsQueryHandler : IRequestHandler<GetRegionsQuery, List<RegionDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<GetRegionsQuery> _logger;

    public GetRegionsQueryHandler(IApplicationDbContext context, ILogger<GetRegionsQuery> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<List<RegionDto>> Handle(GetRegionsQuery request, CancellationToken cancellationToken)
    {
        try
        {
            return await _context.Countries
                .Include(c => c.Regions.Where(x => !x.IsDeleted && x.CountryId == request.CountryId))
                .Where(x => !x.IsDeleted && (request.CountryId != null ? x.Id == request.CountryId : true))
                .SelectMany(e => e.Regions)
                .Select(RegionSelectorExpression())
                .OrderBy(x => x.Country)
                .ToListAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message, ex);
            throw new BusinessRuleException(nameof(GetRegionsQuery), ex.Message);
        }
    }

    private Expression<Func<Region, RegionDto>> RegionSelectorExpression()
    {
        return e => new RegionDto
        {
            Id = e.Id,
            Name = e.Name,
            Code = e.Code,
            Country = e.Country.Name,
            CountryId = e.CountryId
        };
    }
}
