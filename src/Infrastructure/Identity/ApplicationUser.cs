using Microsoft.AspNetCore.Identity;

namespace RegionalAnimalHealth.Infrastructure.Identity;

public class ApplicationUser : IdentityUser
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public long? CountryId { get; set; }
    public string? PasswordResetToken { get; set; } = string.Empty;
    public DateTime? PasswordResetTokenExpiry { get; set; }
}
