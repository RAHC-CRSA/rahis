using CommunityToolkit.Diagnostics;

namespace RegionalAnimalHealth.Domain.Entities.Reports;
public class VaccinationType : BaseAuditableEntity<long>
{
    public string Name { get; private set; }

    private VaccinationType()
    {
    }

    private VaccinationType(string name) : this()
    {
        Name = name;
    }

    public static VaccinationType Create(string name)
    {
        Guard.IsNotNullOrEmpty(name, nameof(name));

        return new VaccinationType(name);
    }

    public void Delete()
    {
        IsDeleted = true;
        LastModified = DateTime.UtcNow;
    }
}
