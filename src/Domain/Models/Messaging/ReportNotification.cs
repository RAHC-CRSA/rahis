using CommunityToolkit.Diagnostics;

namespace RegionalAnimalHealth.Domain.Models.Messaging;
public class ReportNotification : EmailNotification
{
    public static new string TemplateId = "d-a2f64a2491bc4f1989ec60e670119a84";

    public ReportData Report { get; set; }

    public ReportNotification() : base()
    {
    }

    private ReportNotification(string content, string to, string? subject, string? name) : base(content, to, subject, name)
    {
    }

    public static ReportNotification Create(ReportData report, string content, string to, string? subject, string? name)
    {
        Guard.IsNotNullOrEmpty(content, nameof(content));
        Guard.IsNotNullOrEmpty(to, nameof(to));

        return new ReportNotification(content, to, subject, name);
    }

    public class ReportData
    {
        private bool StampingOut { get; set; }

        private ReportData()
        {
        }

        private ReportData(bool stampingOut) : this()
        {
            StampingOut = stampingOut;
        }

        public static ReportData Create(bool stampingOut)
        {
            return new ReportData(stampingOut);
        }
    }
}
