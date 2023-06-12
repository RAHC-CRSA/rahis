using CommunityToolkit.Diagnostics;

namespace RegionalAnimalHealth.Domain.Entities.Reports; 

public class Species : BaseAuditableEntity<long> {
    public string Name { get; private set; }

    private readonly List<TransboundaryDisease> _transboundaryDiseases = new();
    public IReadOnlyCollection<TransboundaryDisease> TransboundaryDiseases => _transboundaryDiseases.AsReadOnly();

    private Species() : base() 
    {
    }

    private Species(string name) : this()
    {
        Name = name;
    }

    public static Species Create(string name)
    {
        Guard.IsNotNullOrEmpty(name, nameof(name));

        return new Species(name);
    }

    public void Update(string name)
    {
        Guard.IsNotNull(name, nameof(name));
        Name = name;
    }

    public void AddTransboundaryDisease(Disease disease)
    {
        var entry = TransboundaryDisease.Create(disease.Id, Id);
        _transboundaryDiseases.Add(entry);
    }

    public void DeleteTransboundaryDiseases()
    {
        foreach(var disease in _transboundaryDiseases)
            disease.Delete();
    }

    public void Delete()
    {
        DeleteTransboundaryDiseases();

        IsDeleted = true;
        LastModified = DateTime.UtcNow;
    }
}
