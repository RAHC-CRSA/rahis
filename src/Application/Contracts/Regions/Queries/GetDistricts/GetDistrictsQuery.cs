using System.Linq.Expressions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Regions;
using RegionalAnimalHealth.Domain.Entities.Regions;

namespace RegionalAnimalHealth.Application.Contracts.Regions.Queries.GetDistricts;

public class GetDistrictsQuery : IRequest<(Result, List<DistrictDto>)>
{
    public long? MunicipalityId { get; set; }
}

public class GetDistrictsQueryHandler : IRequestHandler<GetDistrictsQuery, (Result, List<DistrictDto>)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<GetDistrictsQuery> _logger;

    public GetDistrictsQueryHandler(IApplicationDbContext context, ILogger<GetDistrictsQuery> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(Result, List<DistrictDto>)> Handle(GetDistrictsQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var districts = await _context.Districts
                .Include(x => x.Municipality)
                .Where(x => !x.IsDeleted && (request.MunicipalityId != null ? x.MunicipalityId == request.MunicipalityId : true))
                .Select(DistrictSelectorExpression())
                .ToListAsync();

            return (Result.Success(), districts);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return (Result.Failure(new List<string> { ex.Message }), null);
        }
    }

    private Expression<Func<District, DistrictDto>> DistrictSelectorExpression()
    {
        return e => new DistrictDto
        {
            Id = e.Id,
            MunicipalityId = e.MunicipalityId,
            Name = e.Name,
            MunicipalityName = e.Municipality.Name
        };
    }
}

