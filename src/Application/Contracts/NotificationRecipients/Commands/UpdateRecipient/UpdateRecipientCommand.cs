using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.NotificationRecipients;

namespace RegionalAnimalHealth.Application.Contracts.NotificationRecipients.Commands.UpdateRecipient;
public class UpdateRecipientCommand : IRequest<(Result, NotificationRecipientDto?)>
{
    public long Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Institution { get; set; }
    public bool IsEnabled { get; set; }
}

public class UpdateSpeciesCommandHandler : IRequestHandler<UpdateRecipientCommand, (Result, NotificationRecipientDto?)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<UpdateRecipientCommand> _logger;

    public UpdateSpeciesCommandHandler(IApplicationDbContext context, ILogger<UpdateRecipientCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(Result, NotificationRecipientDto?)> Handle(UpdateRecipientCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var recipient = await _context.NotificationRecipients.Where(x => !x.IsDeleted && x.Id == request.Id).FirstOrDefaultAsync();

            recipient?.Update(request.Name, request.Email, request.Institution, request.IsEnabled);
            await _context.SaveChangesAsync(cancellationToken);

            var data = new NotificationRecipientDto
            {
                Id = recipient.Id,
                Name = recipient.FullName,
                Email = recipient.EmailAddress,
                Institution = recipient.Institution,
                IsEnabled = recipient.IsEnabled
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
