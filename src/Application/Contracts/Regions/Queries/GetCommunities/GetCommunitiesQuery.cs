using System.Linq.Expressions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Regions;
using RegionalAnimalHealth.Domain.Entities.Regions;

namespace RegionalAnimalHealth.Application.Contracts.Regions.Queries.GetCommunities;
public class GetCommunitiesQuery : IRequest<(Result, List<CommunityDto>)>
{
    public long? DistrictId { get; set; }
}

public class GetCommunitiesQueryHandler : IRequestHandler<GetCommunitiesQuery, (Result, List<CommunityDto>)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<GetCommunitiesQuery> _logger;

    public GetCommunitiesQueryHandler(IApplicationDbContext context, ILogger<GetCommunitiesQuery> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(Result, List<CommunityDto>)> Handle(GetCommunitiesQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var communities = await _context.Communities
                .Include(x => x.District)
                .Where(x => !x.IsDeleted && (request.DistrictId != null ? x.DistrictId == request.DistrictId : true))
                .Select(CommunitySelectorExpression())
                .ToListAsync();

            return (Result.Success(), communities);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return (Result.Failure(new List<string> { ex.Message }), null);
        }
    }

    private Expression<Func<Community, CommunityDto>> CommunitySelectorExpression()
    {
        return e => new CommunityDto
        {
            Id = e.Id,
            DistrictId = e.DistrictId,
            Name = e.Name,
            DistrictName = e.District.Name
        };
    }
}