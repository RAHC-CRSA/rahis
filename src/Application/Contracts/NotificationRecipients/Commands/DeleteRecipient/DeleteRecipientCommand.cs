using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;

namespace RegionalAnimalHealth.Application.Contracts.NotificationRecipients.Commands.DeleteRecipient;
public class DeleteRecipientCommand : IRequest<Result>
{
    public long Id { get; set; }
}

public class DeleteRecipientCommandHandler : IRequestHandler<DeleteRecipientCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<DeleteRecipientCommand> _logger;

    public DeleteRecipientCommandHandler(IApplicationDbContext context, ILogger<DeleteRecipientCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<Result> Handle(DeleteRecipientCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var entry = await _context.NotificationRecipients.FirstOrDefaultAsync(x => !x.IsDeleted && x.Id == request.Id);
            if (entry == null)
                return Result.Failure(new List<string> { "Notification recipient entry not found." });

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
