using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Species;

namespace RegionalAnimalHealth.Application.Contracts.Species.Commands.UpdateSpecies;
public class UpdateSpeciesCommand : IRequest<(Result, SpeciesDto?)>
{
    public long Id { get; set; }
    public string Name { get; set; }
}

public class UpdateSpeciesCommandHandler : IRequestHandler<UpdateSpeciesCommand, (Result, SpeciesDto?)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<UpdateSpeciesCommand> _logger;

    public UpdateSpeciesCommandHandler(IApplicationDbContext context, ILogger<UpdateSpeciesCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(Result, SpeciesDto?)> Handle(UpdateSpeciesCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var species = await _context.Species.Where(x => !x.IsDeleted && x.Id == request.Id).FirstOrDefaultAsync();

            species?.Update(request.Name);
            await _context.SaveChangesAsync(cancellationToken);

            var data = new SpeciesDto
            {
                Id = species.Id,
                Name = species.Name
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
