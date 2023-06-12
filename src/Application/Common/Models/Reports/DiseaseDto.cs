namespace RegionalAnimalHealth.Application.Common.Models.Reports;
public class DiseaseDto
{
    public long Id { get; set; }
    public string Name { get; set; }
    public bool Zoonotic { get; set; }
    public string Code { get; set; }
    public string Classification { get; set; }
    public long SpeciesId { get; set; }
}
