using CommunityToolkit.Diagnostics;

namespace RegionalAnimalHealth.Domain.Entities.Reports; 

public class Species : BaseAuditableEntity<long> {
    public string Name { get; private set; }

    private Species()
    {
    }

    private Species(string name) : this()
    {
        Name = name;
    }

    public static Species Create(string name)
    {
        Guard.IsNotNullOrEmpty(name, nameof(name));

        return new Species(name);
    }

    public void Update(string name)
    {
        Guard.IsNotNull(name, nameof(name));
        Name = name;
    }

    public void Delete()
    {
        IsDeleted = true;
        LastModified = DateTime.UtcNow;
    }
}
