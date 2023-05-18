using RegionalAnimalHealth.Application.Common.Mappings;
using RegionalAnimalHealth.Domain.Entities.Reports;

namespace RegionalAnimalHealth.Application.Common.Models.Reports;
public class OccurrenceDto : IMapFrom<Occurrence>
{
    public long? Id { get; set; }
    public string Title { get; set; }
    public string DateStarted { get; set; }
    public string DateEnded { get; set; }
    public string Location { get; set; }
    public int Reports { get; set; }

}
