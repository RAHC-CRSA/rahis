namespace RegionalAnimalHealth.Application.Common.Security.Configurations;
public class AuthorizationConfiguration
{
    public const string ConfigurationName = "Jwt";

    public string Issuer { get; set; }
    public string Secret { get; set; }
    public int ExpirationInMinutes { get; set; }
    public int RefreshTokenExpiryInHours { get; set; }
}
