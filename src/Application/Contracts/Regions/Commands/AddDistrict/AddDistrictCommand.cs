using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Regions;
using RegionalAnimalHealth.Domain.Entities.Regions;

namespace RegionalAnimalHealth.Application.Contracts.Regions.Commands.AddDistrict;
public class AddDistrictCommand : IRequest<(Result, DistrictDto?)>
{
    public long MunicipalityId { get; set; }
    public string Name { get; set; }

}

public class AddDistrictCommandHandler : IRequestHandler<AddDistrictCommand, (Result, DistrictDto?)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<AddDistrictCommand> _logger;

    public AddDistrictCommandHandler(IApplicationDbContext context, ILogger<AddDistrictCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(Result, DistrictDto?)> Handle(AddDistrictCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var municipality = await _context.Municipalities.Where(x => !x.IsDeleted && x.Id == request.MunicipalityId).FirstOrDefaultAsync();

            if (municipality == null)
            {
                var message = "Specified municipality not found.";
                _logger.LogDebug(message, request.MunicipalityId);
                return (Result.Failure(new List<string> { message }), null);
            }

            var district = District.Create(municipality.Id, request.Name);
            await _context.Districts.AddAsync(district);
            await _context.SaveChangesAsync(cancellationToken);

            var data = new DistrictDto
            {
                Id = municipality.Id,
                Name = municipality.Name,
                MunicipalityId = municipality.Id,
                MunicipalityName = municipality.Name
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