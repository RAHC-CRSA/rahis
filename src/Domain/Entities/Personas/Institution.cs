using CommunityToolkit.Diagnostics;
using RegionalAnimalHealth.Domain.Entities.Regions;

namespace RegionalAnimalHealth.Domain.Entities.Personas;

public class Institution : BaseAuditableEntity<long>, IAggregateRoot
{
    public string Name { get; private set; }
    public bool PublicSector { get; private set; }
    public string? Type { get; private set; }
    public long? CountryId { get; private set; }
    public virtual Country Country { get; private set; }

    private readonly List<ParaProfessional> _paraProfessionals = new();
    public IReadOnlyCollection<ParaProfessional> ParaProfessionals => _paraProfessionals.AsReadOnly();

    private Institution() : base()
    {
    }

    private Institution(string name, long countryId, bool publicSector, string? type) : this()
    {
        Name = name;
        PublicSector = publicSector;
        Type = type;
        CountryId = countryId;
    }

    public static Institution Create(string name, long countryId, bool publicSector = false, string? type = null)
    {
        Guard.IsNotNullOrEmpty(name, nameof(name));
        Guard.IsNotNull(countryId, nameof(countryId));

        return new Institution(name, countryId, publicSector, type);
    }

    public void Delete()
    {
        DeleteParaProfessionals();

        IsDeleted = true;
        LastModified = DateTime.UtcNow;
    }

    public void DeleteParaProfessionals()
    {
        foreach (var pro in _paraProfessionals)
            pro.Delete();
    }

    public void Update(string name, long countryId, string? type, bool publicSector)
    {
        Guard.IsNotNullOrEmpty(name, nameof(name));
        Guard.IsNotNull(countryId, nameof(countryId));
        Guard.IsNotNullOrEmpty(type, nameof(type));

        Name = name;
        CountryId = countryId;
        Type = type;
        PublicSector = publicSector;
    }
}
