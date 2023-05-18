using RegionalAnimalHealth.Application.Common.Mappings;
using RegionalAnimalHealth.Domain.Entities.Regions;

namespace RegionalAnimalHealth.Application.Common.Models.Regions;
public class CountryDto : IMapFrom<Country>
{
    public long Id { get; set; }
    public string Name { get; set; }
    public string Code { get; set; }
    public string Flag { get; set; }
    public int Regions { get; set; }
}
