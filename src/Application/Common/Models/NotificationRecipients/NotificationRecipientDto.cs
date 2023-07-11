namespace RegionalAnimalHealth.Application.Common.Models.NotificationRecipients;
public class NotificationRecipientDto
{
    public long Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Institution { get; set; }
    public bool IsEnabled { get; set; }
}
