using CommunityToolkit.Diagnostics;

namespace RegionalAnimalHealth.Domain.Entities.Personas;
public class ParaProfessional : BaseAuditableEntity<long>
{
    public string Name { get; private set; }
    public long? InstitutionId { get; private set; }
    public bool PublicSector { get; private set; }
    public string Type { get; private set; }

    private ParaProfessional()
    {
    }

    private ParaProfessional(string name, bool publicSector, string type, long? institutionId) : this()
    {
        Name = name;
        PublicSector = publicSector;
        Type = type;
    }

    public static ParaProfessional Create(string name, bool publicSector = false, string? type = null, long? institutionId = null)
    {
        Guard.IsNotNullOrEmpty(name, nameof(name));

        return new ParaProfessional(name, publicSector, type, institutionId);
    }

    public void Delete()
    {
        IsDeleted = true;
        LastModified = DateTime.Now;
    }
}
