namespace RegionalAnimalHealth.Application.Common.Models.Reports;
public class MedicationDto
{
    public long Id { get; set; }
    public long ReportId { get; set; }
    public string Name { get; set; }
    public string Dosage { get; set; }
}
