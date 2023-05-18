namespace RegionalAnimalHealth.Application.Contracts.Reports.Queries.GetReports;
public class ReportListDto
{
    public long Id { get; set; }
    public string OccurrenceTitle { get; set; }
    public bool IsVerified { get; set; }
    public int Exposed { get; set; }
    public int Infected { get; set; }
    public int Mortality { get; set; }
    public string Location { get; set; }
    public string Created { get; set; }
}
