namespace RegionalAnimalHealth.Application.Common.Models.Regions;
public class DistrictDto
{
    public long Id { get; set; }
    public long MunicipalityId { get; set; }
    public string Name { get; set; }
    public string MunicipalityName { get; set; }
}
