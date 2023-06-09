using CommunityToolkit.Diagnostics;
using RegionalAnimalHealth.Domain.Entities.Regions;

namespace RegionalAnimalHealth.Domain.Entities.Reports;
public class Occurrence : BaseAuditableEntity<long>, IAggregateRoot
{
    public DateOnly DateStarted { get; private set; }
    public DateOnly? DateEnded { get; private set; }

    public long RegionId { get; private set; }
    public virtual Region Region { get; private set; }

    private readonly List<Report> _reports = new();
    public virtual IReadOnlyCollection<Report> Reports => _reports.AsReadOnly();

    private Occurrence() : base()
    {
    }

    private Occurrence(long regionId, DateOnly dateStarted) : this()
    {
        RegionId = regionId;
        DateStarted = dateStarted;
    }

    public static Occurrence Create(long regionId, DateOnly dateStarted)
    {
        Guard.IsNotNull(regionId, nameof(regionId));
        Guard.IsNotNull(dateStarted, nameof(dateStarted));

        return new Occurrence(regionId, dateStarted);
    }

    public void AddReport(long diseaseId, long speciesId, int numberExposed, int numberInfected, int mortality, DateOnly occurrenceDate)
    {
        var report = Report.Create(Id, diseaseId, speciesId, occurrenceDate);
        _reports.Add(report);
    }

    public void Delete()
    {
        DeleteReports();

        IsDeleted = true;
        LastModified = DateTime.UtcNow;
    }

    public void DeleteReports()
    {
        foreach (var report in _reports)
        {
            report.Delete();
        }
    }
}
