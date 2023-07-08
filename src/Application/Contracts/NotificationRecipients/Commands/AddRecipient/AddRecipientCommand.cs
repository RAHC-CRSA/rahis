using MediatR;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.NotificationRecipients;
using RegionalAnimalHealth.Domain.Entities.Reports;

namespace RegionalAnimalHealth.Application.Contracts.NotificationRecipients.Commands.AddRecipient;
public class AddRecipientCommand : IRequest<(Result, NotificationRecipientDto?)>
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Institution { get; set; }
}

public class AddRecipientCommandHandler : IRequestHandler<AddRecipientCommand, (Result, NotificationRecipientDto?)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<AddRecipientCommand> _logger;

    public AddRecipientCommandHandler(IApplicationDbContext context, ILogger<AddRecipientCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(Result, NotificationRecipientDto?)> Handle(AddRecipientCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var recipient = NotificationRecipient.Create(request.Name, request.Email, request.Institution);
            await _context.NotificationRecipients.AddAsync(recipient);
            await _context.SaveChangesAsync(cancellationToken);

            var data = new NotificationRecipientDto
            {
                Id = recipient.Id,
                Name = recipient.FullName,
                Email = recipient.EmailAddress,
                Institution = recipient.Institution
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
