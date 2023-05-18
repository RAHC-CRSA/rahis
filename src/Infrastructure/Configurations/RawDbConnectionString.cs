namespace RegionalAnimalHealth.Infrastructure.Configurations;
public class RawDbConnectionString
{
    public string Value { get; }

    public RawDbConnectionString(string value)
    {
        Value = value;
    }
}
