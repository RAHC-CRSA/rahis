namespace RegionalAnimalHealth.Infrastructure.Configurations;
public class EmailConfiguration
{
    public static readonly string DefaultTemplate = "d-a2f64a2491bc4f1989ec60e670119a84";

    public string FromEmail { get; set; }
    public string FromName { get; set; }
    public string ApiKey { get; set; }
    public string MandrillApiKey { get; set; }
}
