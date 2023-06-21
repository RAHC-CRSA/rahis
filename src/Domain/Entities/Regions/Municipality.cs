using CommunityToolkit.Diagnostics;

namespace RegionalAnimalHealth.Domain.Entities.Regions;
public class Municipality : BaseAuditableEntity<long>
{
    public string Name { get; set; }

    public long RegionId { get; set; }
    public Region Region { get; set; }

    private readonly List<District> _districts = new ();
    public IReadOnlyCollection<District> Districts => _districts.AsReadOnly();

    private Municipality() : base() { }

    private Municipality(long regionId, string name) : this()
    {
        RegionId = regionId;
        Name = name;
    }

    public static Municipality Create(long regionId, string name)
    {
        Guard.IsNotNull(regionId, nameof(regionId));
        Guard.IsNotNullOrEmpty(name, nameof(name));

        return new Municipality(regionId, name);
    }

    public void AddDistrict(string name)
    {
        _districts.Add(District.Create(Id, name));
    }

    public void DeleteDistricts()
    {
        foreach (var district in _districts)
            district.Delete();
    }

    public void Delete()
    {
        DeleteDistricts();

        IsDeleted = true;
        LastModified = DateTime.UtcNow;
    }
}
