using System.Linq.Expressions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Regions;
using RegionalAnimalHealth.Domain.Entities.Regions;

namespace RegionalAnimalHealth.Application.Contracts.Regions.Queries.GetMunicipalities;
public class GetMunicipalitiesQuery : IRequest<(Result, List<MunicipalityDto>)>
{
    public long? RegionId { get; set; }
}

public class GetMunicipalitiesQueryHandler : IRequestHandler<GetMunicipalitiesQuery, (Result, List<MunicipalityDto>)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<GetMunicipalitiesQuery> _logger;

    public GetMunicipalitiesQueryHandler(IApplicationDbContext context, ILogger<GetMunicipalitiesQuery> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(Result, List<MunicipalityDto>)> Handle(GetMunicipalitiesQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var municipalities = await _context.Municipalities
                .Include(x => x.Region)
                .Where(x => !x.IsDeleted && (request.RegionId != null ? x.RegionId == request.RegionId : true))
                .Select(MunicipalitySelectorExpression())
                .ToListAsync();

            return (Result.Success(), municipalities);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return (Result.Failure(new List<string> { ex.Message }), null);
        }
    }

    private Expression<Func<Municipality, MunicipalityDto>> MunicipalitySelectorExpression()
    {
        return e => new MunicipalityDto
        {
            Id = e.Id,
            RegionId = e.RegionId,
            Name = e.Name,
            RegionName = e.Region.Name
        };
    }
}
