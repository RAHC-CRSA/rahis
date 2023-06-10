using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;

namespace RegionalAnimalHealth.Application.Contracts.Species.Commands.DeleteSpecies;
public class DeleteSpeciesCommand : IRequest<Result>
{
    public long Id { get; set; }
}

public class DeleteSpeciesCommandHandler : IRequestHandler<DeleteSpeciesCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<DeleteSpeciesCommand> _logger;

    public DeleteSpeciesCommandHandler(IApplicationDbContext context, ILogger<DeleteSpeciesCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<Result> Handle(DeleteSpeciesCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var entry = await _context.Species.FirstOrDefaultAsync(x => !x.IsDeleted && x.Id == request.Id);
            if (entry == null)
                return Result.Failure(new List<string> { "Species entry not found." });

            entry.Delete();

            await _context.SaveChangesAsync(cancellationToken);
            return Result.Success();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return Result.Failure(new List<string> { ex.Message });

            throw;
        }
    }
}
