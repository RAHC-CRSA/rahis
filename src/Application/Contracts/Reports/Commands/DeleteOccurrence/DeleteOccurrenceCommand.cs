using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Commands.DeleteOccurrence;
public class DeleteOccurrenceCommand : IRequest<Result>
{
    public long Id { get; set; }
}

public class DeleteOccurrenceCommandHandler : IRequestHandler<DeleteOccurrenceCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<DeleteOccurrenceCommand> _logger;

    public DeleteOccurrenceCommandHandler(IApplicationDbContext context, ILogger<DeleteOccurrenceCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<Result> Handle(DeleteOccurrenceCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var entry = await _context.Occurrences.FirstOrDefaultAsync(x => !x.IsDeleted && x.Id == request.Id);
            if (entry == null)
                return Result.Failure(new List<string> { "Occurrence not found." });

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
