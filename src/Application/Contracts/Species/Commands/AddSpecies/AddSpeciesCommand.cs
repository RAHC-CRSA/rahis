using MediatR;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Species;

namespace RegionalAnimalHealth.Application.Contracts.Species.Commands.AddSpecies;
public class AddSpeciesCommand : IRequest<(Result, SpeciesDto?)>
{
    public string Name { get; set; }
}

public class AddSpeciesCommandHandler : IRequestHandler<AddSpeciesCommand, (Result, SpeciesDto?)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<AddSpeciesCommand> _logger;

    public AddSpeciesCommandHandler(IApplicationDbContext context, ILogger<AddSpeciesCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(Result, SpeciesDto?)> Handle(AddSpeciesCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var species = Domain.Entities.Reports.Species.Create(request.Name);
            await _context.Species.AddAsync(species);
            await _context.SaveChangesAsync(cancellationToken);

            var data = new SpeciesDto
            {
                Id = species.Id,
                Name = species.Name,
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
