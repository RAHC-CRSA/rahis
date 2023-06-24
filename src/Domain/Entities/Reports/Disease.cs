using CommunityToolkit.Diagnostics;

namespace RegionalAnimalHealth.Domain.Entities.Reports;

public class Disease : BaseAuditableEntity<long>
{
    public string Name { get; private set; }
    public bool Zoonotic { get; private set; }
    public string Code { get; private set; }
    public string Classification { get; private set; }

    public bool IsNotifiableDisease { get; set; }
    public bool IsMonitoredDisease { get; set; }

    private readonly List<TransboundaryDisease> _transboundaryDiseases = new();
    public IReadOnlyCollection<TransboundaryDisease> TransboundaryDiseases => _transboundaryDiseases.AsReadOnly();


    private Disease() : base()
    {
    }

    private Disease(string name, string code, string classification, bool zoonotic = false) : this()
    {
        Name = name;
        Code = code;
        Classification = classification;
        Zoonotic = zoonotic;
    }

    public static Disease Create(string name, string code, string classification, bool zoonotic = false)
    {
        Guard.IsNotNullOrEmpty(name, nameof(name));

        return new Disease(name, code, classification, zoonotic);
    }

    public void SetTransboundarySpecies(Species species)
    {
        var entry = TransboundaryDisease.Create(Id, species.Id);
        _transboundaryDiseases.Add(entry);
    }

    public void Delete()
    {
        IsDeleted = true;
        LastModified = DateTime.UtcNow;
    }
}
