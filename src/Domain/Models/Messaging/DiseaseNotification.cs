using CommunityToolkit.Diagnostics;

namespace RegionalAnimalHealth.Domain.Models.Messaging;
public class DiseaseNotification : EmailNotification
{
    public static new string TemplateId = "d-477c56e5b11a4cb6903b96c6b4d98412";

    public DiseaseData Data { get; set; }

    public DiseaseNotification() : base()
    {
    }

    private DiseaseNotification(string content, string to, string? subject, string? name, DiseaseData data) : base(content, to, subject, name)
    {
        Data = data;
    }

    public static DiseaseNotification Create(DiseaseData data, string content, string to, string? subject, string? name)
    {
        Guard.IsNotNullOrEmpty(content, nameof(content));
        Guard.IsNotNullOrEmpty(to, nameof(to));


        return new DiseaseNotification(content, to, subject, name, data);
    }

    public class DiseaseData
    {
        public string Disease { get; private set; }
        public string Region { get; private set; }
        public int Severity { get; private set; }
        public int Exposed { get; private set; }
        public int Infected { get; private set; }
        public int Mortality { get; private set; }

        private DiseaseData()
        {
        }

        private DiseaseData(string disease, string region, int severity, int exposed, int infected, int mortality) : this()
        {
            Disease = disease;
            Region = region;
            Severity = severity;
            Exposed = exposed;
            Infected = infected;
            Mortality = mortality;
        }

        public static DiseaseData Create(string disease, string region, int severity, int exposed, int infected, int mortality)
        {
            return new DiseaseData(disease, region, severity, exposed, infected, mortality);
        }
    }
}
