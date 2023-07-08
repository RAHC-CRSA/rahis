using CommunityToolkit.Diagnostics;

namespace RegionalAnimalHealth.Domain.Entities.Regions;
public class Community : BaseAuditableEntity<long>
{
    public string Name { get; set; }

    public long DistrictId { get; set; }
    public District District { get; set; }

    private Community() : base()
    {
    }

    private Community(long districtId, string name) : this()
    {
        DistrictId = districtId;
        Name = name;
    }

    public static Community Create(long districtId, string name)
    {
        Guard.IsNotNull(districtId, nameof(districtId));
        Guard.IsNotNullOrEmpty(name, nameof(name));

        return new Community(districtId, name);
    }

    public void Delete()
    {
        IsDeleted = true;
        LastModified = DateTime.UtcNow;
    }
    
}
