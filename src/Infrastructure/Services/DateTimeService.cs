using RegionalAnimalHealth.Application.Common.Interfaces;

namespace RegionalAnimalHealth.Infrastructure.Services;

public class DateTimeService : IDateTime
{
    public DateTime Now => DateTime.Now;
}
