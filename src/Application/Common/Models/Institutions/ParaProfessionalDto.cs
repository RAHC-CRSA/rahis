namespace RegionalAnimalHealth.Application.Common.Models.Institutions;
public class ParaProfessionalDto
{
    public long Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string Position { get; set; }
    public long? InstitutionId { get; set; }
    public string? InstitutionName { get; set; }
}
