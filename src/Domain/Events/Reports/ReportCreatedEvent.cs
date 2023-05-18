using RegionalAnimalHealth.Domain.Entities.Reports;

namespace RegionalAnimalHealth.Domain.Events.Reports;
public class ReportCreatedEvent : BaseEvent
{
    public ReportCreatedEvent(Report report)
    {
        Report = report;
    }

    public Report Report { get; }
}
