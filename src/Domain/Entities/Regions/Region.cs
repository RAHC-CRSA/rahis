using CommunityToolkit.Diagnostics;

namespace RegionalAnimalHealth.Domain.Entities.Regions;
public class Region : BaseAuditableEntity<long>, IAggregateRoot
{
    public string Name { get; private set; }
    public string Code { get; private set; }
    public long CountryId { get; private set; }
    public virtual Country Country { get; private set; }

    private Region()
    {
    }

    private Region(long countryId, string name, string code) : this()
    {
        Name = name;
        Code = code;
        CountryId = countryId;
    }

    public static Region Create(long countryId, string name, string code)
    {
        Guard.IsNotNull(countryId, nameof(countryId));
        Guard.IsNotNullOrEmpty(name, nameof(name));
        Guard.IsNotNullOrEmpty(code, nameof(code));

        return new Region(countryId, name, code);
    }

    public void Delete()
    {
        IsDeleted = true;
        LastModified = DateTime.UtcNow;
    }
}
