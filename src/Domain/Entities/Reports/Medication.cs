using CommunityToolkit.Diagnostics;

namespace RegionalAnimalHealth.Domain.Entities.Reports;
public class Medication : BaseAuditableEntity<long>
{
    public string Name { get; private set; }
    public string Dosage { get; private set; }
    public long ReportId { get; private set; }
    public virtual Report Report { get; private set; }

    private Medication() : base()
    {
    }

    private Medication(long reportId, string name, string dosage) : this()
    {
        ReportId = reportId;
        Name = name;
        Dosage = dosage;
    }

    public static Medication Create(long reportId, string name, string dosage)
    {
        Guard.IsNotNull(reportId, nameof(reportId));
        Guard.IsNotNullOrEmpty(name, nameof(name));
        Guard.IsNotNullOrEmpty(dosage, nameof(dosage));

        return new Medication(reportId, name, dosage);
    }

    public void Delete()
    {
        IsDeleted = true;
        LastModified = DateTime.UtcNow;
    }
}
