using MediatR;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Regions;
using RegionalAnimalHealth.Domain.Entities.Regions;

namespace RegionalAnimalHealth.Application.Contracts.Regions.Commands.AddCountry;
public class AddCountryCommand : IRequest<(Result, CountryDto?)>
{
    public string Name { get; set; }
    public string Flag { get; set; }
    public string Code { get; set; }
}

public class AddCountryCommandHandler : IRequestHandler<AddCountryCommand, (Result, CountryDto?)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<AddCountryCommand> _logger;

    public AddCountryCommandHandler(IApplicationDbContext context, ILogger<AddCountryCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(Result, CountryDto?)> Handle(AddCountryCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var country = Country.Create(request.Name, request.Code, request.Flag);
            await _context.Countries.AddAsync(country);
            await _context.SaveChangesAsync(cancellationToken);

            var countryDto = new CountryDto
            {
                Id = country.Id,
                Name = country.Name,
                Flag = country.Flag,
                Code = country.Code
            };

            return (Result.Success(), countryDto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return (Result.Failure(new List<string> { ex.Message }), null);
        }
    }
}
