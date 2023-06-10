using RegionalAnimalHealth.Application.Common.Mappings;
using RegionalAnimalHealth.Domain.Entities.Regions;

namespace RegionalAnimalHealth.Application.Common.Models.Regions;
public class RegionDto : IMapFrom<Region>
{
    public long Id { get; set; }
    public string Name { get; set; }
    public string Code { get; set; }
    public string CountryName { get; set; }
    public string CountryFlag { get; set; }
    public long CountryId { get; set; }
}
