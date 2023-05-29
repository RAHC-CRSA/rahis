namespace RegionalAnimalHealth.Application.Common.Models.Institutions;
public class InstitutionDto
{
    public long Id { get; set; }
    public string Name { get; set; }
    public bool PublicSector { get; set; }
    public string? Type { get; set; }
    public List<ParaProfessionalDto> ParaProfessionals { get; set; }
}
