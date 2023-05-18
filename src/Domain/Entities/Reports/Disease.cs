using CommunityToolkit.Diagnostics;

namespace RegionalAnimalHealth.Domain.Entities.Reports;

public class Disease : BaseAuditableEntity<long>
{
    public string Name { get; private set; }
    public bool Zoonotic { get; private set; }
    public string Code { get; private set; }
    public string Classification { get; private set; }


    private Disease()
    {
    }

    private Disease(string name, string code, string classification, bool zoonotic = false) : this()
    {
        Name = name;
        Code = code;
        Classification = classification;
        Zoonotic = zoonotic;
    }

    public static Disease Create(string name, string code, string classification, bool zoonotic = false)
    {
        Guard.IsNotNullOrEmpty(name, nameof(name));

        return new Disease(name, code, classification, zoonotic);
    }

    public void Delete()
    {
        IsDeleted = true;
        LastModified = DateTime.UtcNow;
    }
}
