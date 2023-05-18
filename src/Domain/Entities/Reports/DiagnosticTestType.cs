using CommunityToolkit.Diagnostics;

namespace RegionalAnimalHealth.Domain.Entities.Reports;
public class DiagnosticTestType : BaseAuditableEntity<long>
{
    public string Name { get; private set; }

    private DiagnosticTestType()
    {
    }

    private DiagnosticTestType(string name) : this()
    {
        Name = name;
    }

    public static DiagnosticTestType Create(string name)
    {
        Guard.IsNotNull(name, nameof(name));

        return new DiagnosticTestType(name);
    }
}
