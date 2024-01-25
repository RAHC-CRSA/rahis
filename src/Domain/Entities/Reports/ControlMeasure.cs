using CommunityToolkit.Diagnostics;

namespace RegionalAnimalHealth.Domain.Entities.Reports;
public class ControlMeasure : BaseAuditableEntity<long>
{
    public string Name { get; private set; }
    public string Code { get; private set; }

    private ControlMeasure() : base()
    {        
    }

    private ControlMeasure(string name, string code) : this()
    {
        Name = name;
        Code = code;
    }

    public static ControlMeasure Create(string name, string code)
    {
        Guard.IsNotNullOrEmpty(name, nameof(name));
        Guard.IsNotNullOrEmpty(code, nameof(code));

        return new ControlMeasure(name, code);
    }

    private void Delete()
    {
        IsDeleted = true;
        LastModified = DateTime.UtcNow;
    }
}
