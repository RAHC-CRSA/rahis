namespace RegionalAnimalHealth.Application.Common.Models.Authorization;
public class AuthResponseDto
{
    public string AppUserId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public long? CountryId { get; set; }
    public string CountryName { get; set; } = string.Empty;
    public string CountryFlag { get; set; } = string.Empty;
    public string AuthToken { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
    public List<string> Roles { get; set; }
}
