using CommunityToolkit.Diagnostics;
using RegionalAnimalHealth.Domain.Entities.Regions;

namespace RegionalAnimalHealth.Domain.Entities.Reports;
public class Occurrence : BaseAuditableEntity<long>, IAggregateRoot
{
    public DateOnly DateStarted { get; private set; }
    public DateOnly? DateEnded { get; private set; }

    public long CountryId { get; private set; }
    public Country Country { get; private set; }

    public long RegionId { get; private set; }
    public virtual Region Region { get; private set; }

    public long? CommunityId { get; set; }
    public Community Community { get; set; }

    public long? DistrictId { get; set; }
    public District District { get; set; }

    public long? MunicipalityId { get; set; }
    public Municipality Municipality { get; set; }

    public long? TransboundaryDiseaseId { get; set; }
    public TransboundaryDisease TransboundaryDisease { get; set; }

    private readonly List<Report> _reports = new();
    public virtual IReadOnlyCollection<Report> Reports => _reports.AsReadOnly();

    private Occurrence() : base()
    {
    }

    private Occurrence(long countryId, long regionId, long? municipalityId, long? districtId, long? communityId, DateOnly dateStarted) : this()
    {
        CountryId = countryId;
        RegionId = regionId;
        MunicipalityId = municipalityId;
        DistrictId = districtId;
        CommunityId = communityId;
        DateStarted = dateStarted;
    }

    public static Occurrence Create(long countryId, long regionId, long? municipalityId, long? districtId, long? communityId, DateOnly dateStarted)
    {
        Guard.IsNotNull(countryId, nameof(countryId));
        Guard.IsNotNull(regionId, nameof(regionId));
        Guard.IsNotNull(dateStarted, nameof(dateStarted));

        return new Occurrence(countryId, regionId, municipalityId, districtId, communityId, dateStarted);
    }

    public void SetTransboundaryDisease(long id)
    {
        TransboundaryDiseaseId = id;
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

    public void AddReport(Report report)
    {
        _reports.Add(report);
    }
}
