using CommunityToolkit.Diagnostics;

namespace RegionalAnimalHealth.Domain.Entities.Reports;
public class NotificationRecipient : BaseAuditableEntity<long>
{
    public string FullName { get; private set; }
    public string EmailAddress { get; private set; }
    public string? Institution { get; private set; }
    public bool IsEnabled { get; private set; }

    private NotificationRecipient() : base()
    {
    }

    private NotificationRecipient(string fullName, string emailAddress, string? institution) : this()
    {
        FullName = fullName;
        EmailAddress = emailAddress;
        Institution = institution;
        IsEnabled = true;
    }

    public static NotificationRecipient Create(string fullName, string email, string? institution = null)
    {
        Guard.IsNotNullOrEmpty(fullName, nameof(fullName));
        Guard.IsNotNullOrEmpty(email, nameof(email));

        return new NotificationRecipient(fullName, email, institution);
    }

    public void Update(string fullName, string email, string? institution, bool enabled)
    {
        FullName = fullName;
        EmailAddress = email;
        Institution = institution;
        IsEnabled = enabled;
    }

    public void Deactivate()
    {
        IsEnabled = false;
    }

    public void Delete()
    {
        IsDeleted = true;
        LastModified = DateTime.UtcNow;
    }

}
