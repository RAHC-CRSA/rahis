using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models.Regions;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Domain.Entities.Regions;
using Microsoft.EntityFrameworkCore;

namespace RegionalAnimalHealth.Application.Contracts.Regions.Commands.AddCommunity;
public class AddCommunityCommand : IRequest<(Result, CommunityDto?)>
{
    public long DistrictId { get; set; }
    public string Name { get; set; }

}

public class AddCommunityCommandHandler : IRequestHandler<AddCommunityCommand, (Result, CommunityDto?)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<AddCommunityCommand> _logger;

    public AddCommunityCommandHandler(IApplicationDbContext context, ILogger<AddCommunityCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(Result, CommunityDto?)> Handle(AddCommunityCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var district = await _context.Communities.Where(x => !x.IsDeleted && x.Id == request.DistrictId).FirstOrDefaultAsync();

            if (district == null)
            {
                var message = "Specified district not found.";
                _logger.LogDebug(message, request.DistrictId);
                return (Result.Failure(new List<string> { message }), null);
            }

            var community = Community.Create(district.Id, request.Name);
            await _context.Communities.AddAsync(community);
            await _context.SaveChangesAsync(cancellationToken);

            var data = new CommunityDto
            {
                Id = community.Id,
                Name = community.Name,
                DistrictId = district.Id,
                DistrictName = district.Name
            };

            return (Result.Success(), data);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return (Result.Failure(new List<string> { ex.Message }), null);
        }
    }
}
