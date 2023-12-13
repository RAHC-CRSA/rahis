using CommunityToolkit.Diagnostics;

namespace RegionalAnimalHealth.Domain.Entities.Reports;

public class Disease : BaseAuditableEntity<long>
{
    public string Name { get; private set; }
    public bool IsZoonotic { get; private set; }
    public string Code { get; private set; }
    public string Classification { get; private set; }

    public bool IsNotifiable { get; private set; }
    public bool IsMonitored { get; private set; }
    public bool IsPriority { get; private set; }

    private readonly List<TransboundaryDisease> _transboundaryDiseases = new();
    public IReadOnlyCollection<TransboundaryDisease> TransboundaryDiseases => _transboundaryDiseases.AsReadOnly();


    private Disease() : base()
    {
    }

    private Disease(string name, string code, string classification, bool isZoonotic = false) : this()
    {
        Name = name;
        Code = code;
        Classification = classification;
        IsZoonotic = isZoonotic;
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
