using System.Data;
using System.Linq.Expressions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Reports;
using RegionalAnimalHealth.Domain.Entities.Reports;
using RegionalAnimalHealth.Domain.Models.Messaging;
using static RegionalAnimalHealth.Domain.Models.Messaging.ReportNotification;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Commands.SendNotification;
public class SendNotificationCommand : IRequest<Result>
{
    public long ReportId { get; set; }
}

public class SendNotificationCommandHandler : IRequestHandler<SendNotificationCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IEmailService _emailService;
    private readonly ILogger<SendNotificationCommand> _logger;

    public SendNotificationCommandHandler(IApplicationDbContext context, IEmailService emailService, ILogger<SendNotificationCommand> logger)
    {
        _context = context;
        _emailService = emailService;
        _logger = logger;
    }


    public async Task<Result> Handle(SendNotificationCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var reportData = await _context.Reports.Where(x => !x.IsDeleted && x.Id == request.ReportId).Select(ReportSelectorExpression()).FirstOrDefaultAsync();
            var notifications = await _context.NotificationRecipients
                .Where(x => !x.IsDeleted && x.IsEnabled)
                .Select(EmailRecipientSelector(reportData))
                .ToListAsync();

            var result = await _emailService.SendBulkEmailsAsync(notifications, TemplateId);

            if (result.Succeeded)
            {
                var report = await _context.Reports.Where(x => x.Id == request.ReportId).FirstOrDefaultAsync();


                report.SetNotificationSendStatus();

                _context.Reports.Update(report);
                await _context.SaveChangesAsync(cancellationToken);
            }


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
        return e => Create(reportData, "A notification report has been sent.", e.EmailAddress, "New Report", e.FullName);
    }
}
