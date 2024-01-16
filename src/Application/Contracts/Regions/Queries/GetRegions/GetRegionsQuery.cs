using System.Linq.Expressions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Regions;
using RegionalAnimalHealth.Domain.Entities.Regions;

namespace RegionalAnimalHealth.Application.Contracts.Regions.Queries.GetRegions;
public class GetRegionsQuery : IRequest<(Result, List<RegionDto>?)>
{
    public long? CountryId { get; set; }
}

public class GetRegionsQueryHandler : IRequestHandler<GetRegionsQuery, (Result, List<RegionDto>?)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<GetRegionsQuery> _logger;

    public GetRegionsQueryHandler(IApplicationDbContext context, ILogger<GetRegionsQuery> logger)
    {
        _context = context;
        _logger = logger;
    }       

    public async Task<(Result, List<RegionDto>?)> Handle(GetRegionsQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var regions = await _context.Regions
                .Include(c => c.Country)
                .Where(x => !x.IsDeleted && (request.CountryId != null ? x.CountryId == request.CountryId : true))
                .Select(RegionSelectorExpression())
                .OrderBy(x => x.CountryName)
                .ToListAsync();

            return (Result.Success(), regions);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return (Result.Failure(new List<string> { ex.Message }), null);
        }
    }

    private Expression<Func<Region, RegionDto>> RegionSelectorExpression()
    {
        return e => new RegionDto
        {
            Id = e.Id,
            Name = e.Name,
            Code = e.Code,
            CountryName = e.Country.Name,
            CountryFlag = e.Country.Flag,
            CountryId = e.CountryId
        };
    }
}
