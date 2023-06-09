using CommunityToolkit.Diagnostics;

namespace RegionalAnimalHealth.Domain.Entities.Personas;

public class Institution : BaseAuditableEntity<long>, IAggregateRoot
{
    public string Name { get; private set; }
    public bool PublicSector { get; private set; }
    public string? Type { get; private set; }

    private readonly List<ParaProfessional> _paraProfessionals = new();
    public IReadOnlyCollection<ParaProfessional> ParaProfessionals => _paraProfessionals.AsReadOnly();

    private Institution() : base()
    {
    }

    private Institution(string name, bool publicSector, string? type) : this()
    {
        Name = name;
        PublicSector = publicSector;
        Type = type;
    }

    public static Institution Create(string name, bool publicSector = false, string? type = null)
    {
        Guard.IsNotNullOrEmpty(name, nameof(name));

        return new Institution(name, publicSector, type);
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
}
