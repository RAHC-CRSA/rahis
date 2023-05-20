using CommunityToolkit.Diagnostics;
using RegionalAnimalHealth.Domain.Entities.Personas;

namespace RegionalAnimalHealth.Domain.Entities.Reports;

public class DiagnosticTest : BaseAuditableEntity<long>
{
    public string Name { get; private set; }
    public int NumberTested { get; private set; }
    public long ReportId { get; private set; }
    public long? InstitutionId { get; private set; }
    public virtual Institution Institution { get; private set; }
    public long ProfessionalId { get; private set; }
    public virtual ParaProfessional Professional { get; private set; }

    private DiagnosticTest()
    {
    }

    private DiagnosticTest(long reportId, string name, int numberTested, long professionalId, long? institutionId) : this()
    {
        ReportId = reportId;
        Name = name;
        NumberTested = numberTested;
        ProfessionalId = professionalId;
        InstitutionId = institutionId;
    }

    public static DiagnosticTest Create(long reportId, string name, int numberTested, long professionalId, long? institutionId = null)
    {
        Guard.IsNotNull(reportId, nameof(reportId));
        Guard.IsNotNullOrEmpty(name, nameof(name));
        Guard.IsNotNull(numberTested, nameof(numberTested));
        Guard.IsNotNull(professionalId, nameof(professionalId));

        return new DiagnosticTest(reportId, name, numberTested, professionalId, institutionId);
    }

    public void Delete()
    {
        IsDeleted = true;
        LastModified = DateTime.UtcNow;
    }
}
