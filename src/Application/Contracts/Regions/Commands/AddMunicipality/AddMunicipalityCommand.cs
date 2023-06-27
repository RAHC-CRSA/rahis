using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Regions;
using RegionalAnimalHealth.Domain.Entities.Regions;

namespace RegionalAnimalHealth.Application.Contracts.Regions.Commands.AddMunicipality;
public class AddMunicipalityCommand : IRequest<(Result, MunicipalityDto?)>
{
    public long RegionId { get; set; }
    public string Name { get; set; }

}

public class AddMunicipalityCommandHandler : IRequestHandler<AddMunicipalityCommand, (Result, MunicipalityDto?)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<AddMunicipalityCommand> _logger;

    public AddMunicipalityCommandHandler(IApplicationDbContext context, ILogger<AddMunicipalityCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(Result, MunicipalityDto?)> Handle(AddMunicipalityCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var region = await _context.Regions.Where(x => !x.IsDeleted && x.Id == request.RegionId).FirstOrDefaultAsync();

            if (region == null)
            {
                var message = "Specified region not found.";
                _logger.LogDebug(message, request.RegionId);
                return (Result.Failure(new List<string> { message }), null);
            }

            var municipality = Municipality.Create(region.Id, request.Name);
            await _context.Municipalities.AddAsync(municipality);
            await _context.SaveChangesAsync(cancellationToken);

            var data = new MunicipalityDto
            {
                Id = municipality.Id,
                Name = municipality.Name,
                RegionId = region.Id,
                RegionName = region.Name
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
