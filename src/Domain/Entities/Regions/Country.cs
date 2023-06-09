using CommunityToolkit.Diagnostics;

namespace RegionalAnimalHealth.Domain.Entities.Regions;
public class Country : BaseAuditableEntity<long>, IAggregateRoot
{
    public string Name { get; private set; }
    public string Code { get; private set; }
    public string Flag { get; private set; }

    private readonly List<Region> _regions = new ();
    public virtual IReadOnlyCollection<Region> Regions => _regions.AsReadOnly();

    private Country() : base()
    {
    }

    private Country(string name, string code, string flag) : this()
    {
        Name = name;
        Code = code;
        Flag = flag;
    }

    public static Country Create(string name, string code, string flag)
    {
        Guard.IsNotNullOrEmpty(name, nameof(name));
        Guard.IsNotNullOrEmpty(code, nameof(code));

        return new Country(name, code, flag);
    }

    public void AddRegion(string name, string code)
    {
        var region = Region.Create(Id, name, code);
        _regions.Add(region);
    }

    public void Delete()
    {
        DeleteRegions();

        IsDeleted = true;
        LastModified = DateTime.UtcNow;
    }

    public void DeleteRegions()
    {
        foreach (var region in _regions)
        {
            region.Delete();
        }
    }
}
