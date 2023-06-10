using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;

namespace RegionalAnimalHealth.Application.Contracts.Regions.Commands.DeleteRegion;
public class DeleteRegionCommand : IRequest<Result>
{
    public long Id { get; set; }
}

public class DeleteRegionCommandHandler : IRequestHandler<DeleteRegionCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<DeleteRegionCommand> _logger;

    public DeleteRegionCommandHandler(IApplicationDbContext context, ILogger<DeleteRegionCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<Result> Handle(DeleteRegionCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var entry = await _context.Regions.Where(x => !x.IsDeleted && x.Id == request.Id).FirstOrDefaultAsync();
            if (entry == null)
                return Result.Failure(new List<string> { "Region not found." });

            entry.Delete();
            await _context.SaveChangesAsync(cancellationToken);

            return Result.Success();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return Result.Failure(new List<string> { ex.Message });
        }
    }
}
