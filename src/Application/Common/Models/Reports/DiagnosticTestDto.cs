namespace RegionalAnimalHealth.Application.Common.Models.Reports;
public class DiagnosticTestDto
{
    public long Id { get; set; }
    public string Name { get; set; }
    public long ReportId { get; set; }
    public int NumberTested { get; set; }
    public long ProfessionalId { get; set; }
    public string ProfessionalName { get; set; }
}
