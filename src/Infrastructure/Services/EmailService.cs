using System.Text.RegularExpressions;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Domain.Models.Messaging;
using RegionalAnimalHealth.Infrastructure.Configurations;
using SendGrid;
using SendGrid.Helpers.Mail;

namespace RegionalAnimalHealth.Infrastructure.Services;
public class EmailService : IEmailService
{
    private readonly EmailConfiguration _emailConfig;
    private readonly ILogger<EmailConfiguration> _logger;

    public EmailService(EmailConfiguration emailConfig, ILogger<EmailConfiguration> logger)
    {
        _emailConfig = emailConfig;
        _logger = logger;
    }
    public async Task<Result> SendEmailAsync(EmailNotification notification, string templateId)
    {
        try
        {
            var apiKey = _emailConfig.ApiKey;
            var fromEmail = _emailConfig.FromEmail;
            var fromName = _emailConfig.FromName;

            var plainTextContent = Regex.Replace(notification.Content, "<[^>]*>", "");

            var sendGridClient = new SendGridClient(apiKey);
            var msg = new SendGridMessage();

            msg.From = new EmailAddress(fromEmail, fromName);
            msg.AddTo(notification.To);

            if (notification.Subject != null)
            {
                msg.Subject = notification.Subject;
            }

            msg.HtmlContent = notification.Content;
            msg.PlainTextContent = plainTextContent;
            msg.SetTemplateId(templateId);
            msg.SetTemplateData(notification);
            await sendGridClient.SendEmailAsync(msg);

            return Result.Success();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message, ex);
            return Result.Failure(new List<string> { ex.Message });
        }

    }

    public async Task<Result> SendBulkEmailsAsync(IEnumerable<EmailNotification> notifications, string templateId)
    {
        try
        {
            var apiKey = _emailConfig.ApiKey;
            var fromEmail = _emailConfig.FromEmail;
            var fromName = _emailConfig.FromName;

            var sendGridClient = new SendGridClient(apiKey);

            var from = new EmailAddress(fromEmail, fromName);
            var dynamicData = new List<object>();
            var recipients = new List<EmailAddress>();

            int notificationCount = 0;

            foreach (var notification in notifications)
            {
                recipients.Add(new EmailAddress(notification.To, notification.Name));
                dynamicData.Add(notification);

                notificationCount++;

                if (notificationCount == notifications.Count() || notificationCount % 999 == 0)
                {
                    SendGridMessage msg = MailHelper.CreateMultipleTemplateEmailsToMultipleRecipients(from, recipients, templateId, dynamicData);
                    msg.SetSubject(notification.Subject);

                    await sendGridClient.SendEmailAsync(msg);

                    recipients.Clear();
                    dynamicData.Clear();
                }
            }

            return Result.Success();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message, ex);
            return Result.Failure(new List<string> { ex.Message });
        }
    }
}
