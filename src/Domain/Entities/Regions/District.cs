using CommunityToolkit.Diagnostics;

namespace RegionalAnimalHealth.Domain.Entities.Regions;
public class District : BaseAuditableEntity<long>
{
    public string Name { get; set; }

    public long MunicipalityId { get; set; }
    public Municipality Municipality { get; set; }

    private readonly List<Community> _communities = new();
    public IReadOnlyCollection<Community> Communities => _communities.AsReadOnly();

    private District() : base()
    {
    }

    private District(long municipalityId, string name)
    {
        MunicipalityId = municipalityId;
        Name = name;
    }

    public static District Create(long municipalityId, string name)
    {
        Guard.IsNotNull(municipalityId, nameof(municipalityId));
        Guard.IsNotNullOrEmpty(name, nameof(name));

        return new District(municipalityId, name);
    }

    public void AddCommunity(string name)
    {
        _communities.Add(Community.Create(Id, name));
    }

    public void DeleteCommunities()
    {
        foreach (var community in _communities) 
            community.Delete();
    }

    public void Delete()
    {
        DeleteCommunities();

        IsDeleted = true;
        LastModified = DateTime.UtcNow;
    }
}
