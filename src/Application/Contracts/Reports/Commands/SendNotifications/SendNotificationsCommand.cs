using System.Data;
using System.Linq.Expressions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Reports;
using RegionalAnimalHealth.Application.Contracts.Users.Queries.GetUsers;
using RegionalAnimalHealth.Domain.Entities.Reports;
using RegionalAnimalHealth.Domain.Models.Messaging;
using static RegionalAnimalHealth.Domain.Models.Messaging.ReportNotification;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Commands.SendNotifications;
public class SendNotificationsCommand : IRequest<Result>
{
    public long ReportId { get; set; }
}

public class SendNotificationsCommandHandler : IRequestHandler<SendNotificationsCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IEmailService _emailService;
    private readonly ILogger<SendNotificationsCommand> _logger;

    public SendNotificationsCommandHandler(IApplicationDbContext context, IEmailService emailService, ILogger<SendNotificationsCommand> logger)
    {
        _context = context;
        _emailService = emailService;
        _logger = logger;
    }


    public async Task<Result> Handle(SendNotificationsCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var report = await _context.Reports.Where(x => !x.IsDeleted && x.Id == request.ReportId).Select(ReportSelectorExpression()).FirstOrDefaultAsync();
            var notifications = await _context.NotificationRecipients
                .Where(x => !x.IsDeleted && x.IsEnabled)
                .Select(EmailRecipientSelector(report))
                .ToListAsync();

            await _emailService.SendBulkEmailsAsync(notifications, TemplateId);

            return Result.Success();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return Result.Failure(new List<string> { ex.Message });
        }
    }

    private Expression<Func<Report, ReportDto>> ReportSelectorExpression()
    {
        return e => new ReportDto
        {
            StampingOut = e.StampingOut
        };
    }

    private Expression<Func<NotificationRecipient, ReportNotification>> EmailRecipientSelector(ReportDto report)
    {
        var reportData = ReportData.Create(report.StampingOut);
        return e => Create(reportData, "", e.EmailAddress, "New Report", e.FullName);
    }
}
