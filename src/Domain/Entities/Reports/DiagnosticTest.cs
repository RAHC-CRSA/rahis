using CommunityToolkit.Diagnostics;
using RegionalAnimalHealth.Domain.Entities.Personas;

namespace RegionalAnimalHealth.Domain.Entities.Reports;

public class DiagnosticTest : BaseAuditableEntity<long>
{
    public string Name { get; private set; }
    public int NumberTested { get; private set; }
    public int NumberPositive { get; private set; }
    public int NumberNegative { get; private set; }
    public long ReportId { get; private set; }
    public long ProfessionalId { get; private set; }
    public virtual ParaProfessional Professional { get; private set; }
    public DateTime? ResultConfirmationDate { get; private set; }
    public string? TestResultImage { get; private set; }
    public long? TestResultFileId { get; private set; }
    public virtual File TestResultFile { get; private set; }

    private DiagnosticTest() : base()
    {
    }

    private DiagnosticTest(long reportId, string name, int numberTested, int numberPositive, int numberNegative, long professionalId, string? testResultImage) : this()
    {
        ReportId = reportId;
        Name = name;
        NumberTested = numberTested;
        NumberPositive = numberPositive;
        NumberNegative = numberNegative;
        ProfessionalId = professionalId;
        TestResultImage = testResultImage;
    }

    public static DiagnosticTest Create(long reportId, string name, int numberTested, int numberPositive, int numberNegative, long professionalId, string? testResultImage)
    {
        Guard.IsNotNull(reportId, nameof(reportId));
        Guard.IsNotNullOrEmpty(name, nameof(name));
        Guard.IsNotNull(numberTested, nameof(numberTested));
        Guard.IsNotNull(professionalId, nameof(professionalId));

        return new DiagnosticTest(reportId, name, numberTested, numberPositive, numberNegative, professionalId, testResultImage);
    }

    public void Delete()
    {
        IsDeleted = true;
        LastModified = DateTime.UtcNow;
    }
}
