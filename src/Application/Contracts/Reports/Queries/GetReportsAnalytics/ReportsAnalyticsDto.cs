using RegionalAnimalHealth.Application.Common.Models.Analytics;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Queries.GetReportsAnalytics;
public class ReportsAnalyticsDto
{
    public string Name { get; set; }
    public int Total { get; set; }
    public int Verified { get; set; }
    public int Unverified { get; set; }
    public int Notified { get; set; }
    public DataSeriesType SeriesType { get; set; }
    public List<DataPoint> DataPoints { get; set; } = new List<DataPoint>();
}
