using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Regions;
using RegionalAnimalHealth.Domain.Entities.Regions;

namespace RegionalAnimalHealth.Application.Contracts.Regions.Commands.AddRegion;
public class AddRegionCommand : IRequest<(Result, RegionDto?)>
{
    public long CountryId { get; set; }
    public string Name { get; set; }
    public string Code { get; set; }

}

public class AddRegionCommandHandler : IRequestHandler<AddRegionCommand, (Result, RegionDto?)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<AddRegionCommand> _logger;

    public AddRegionCommandHandler(IApplicationDbContext context, ILogger<AddRegionCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(Result, RegionDto?)> Handle(AddRegionCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var country = await _context.Countries.Where(x => !x.IsDeleted && x.Id == request.CountryId).FirstOrDefaultAsync();

            if (country == null)
            {
                var message = "Specified country not found.";
                _logger.LogDebug(message, request.CountryId);
                return (Result.Failure(new List<string> { message }), null);
            }

            var region = Region.Create(country.Id, request.Name, request.Code);
            await _context.Regions.AddAsync(region);
            await _context.SaveChangesAsync(cancellationToken);

            var data = new RegionDto
            {
                Id = region.Id,
                Name = region.Name,
                Code = region.Code,
                CountryId = region.CountryId,
            };

            return (Result.Success(), data);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message, request);
            return (Result.Failure(new List<string> { ex.Message }), null);
        }
    }
}
