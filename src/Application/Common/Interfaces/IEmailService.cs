using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Domain.Models.Messaging;

namespace RegionalAnimalHealth.Application.Common.Interfaces;
public interface IEmailService
{
    Task<Result> SendEmailAsync(EmailNotification notification, string templateId);
}
