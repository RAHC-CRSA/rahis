using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;

namespace RegionalAnimalHealth.Application.Contracts.Regions.Commands.DeleteCommunity;
public class DeleteCommunityCommand : IRequest<Result>
{
    public long Id { get; set; }
}

public class DeleteCommunityCommandHandler : IRequestHandler<DeleteCommunityCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<DeleteCommunityCommand> _logger;

    public DeleteCommunityCommandHandler(IApplicationDbContext context, ILogger<DeleteCommunityCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<Result> Handle(DeleteCommunityCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var entry = await _context.Communities.Where(x => !x.IsDeleted && x.Id == request.Id).FirstOrDefaultAsync();
            if (entry == null)
                return Result.Failure(new List<string> { "Community not found." });

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
