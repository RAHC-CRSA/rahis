namespace RegionalAnimalHealth.Application.Common.Models.Reports;
public class VaccinationDto
{
    public long? Id { get; set; }
    public string Name { get; set; }
    public int NumberVaccinated { get; set; }
    public long ReportId { get; set; }
    public bool IsHuman { get; set; }
    public bool IsAnimal { get; set; }
    public long? ProfessionalId { get; set; }
    public string ProfessionalName { get; set; }
}
