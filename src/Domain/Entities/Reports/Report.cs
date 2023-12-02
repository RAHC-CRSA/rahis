using CommunityToolkit.Diagnostics;

namespace RegionalAnimalHealth.Domain.Entities.Reports;
public class Report : BaseAuditableEntity<long>
{
    public DateOnly OccurrenceDate { get; private set; }
    public int NumberInfected { get; private set; }
    public int NumberExposed { get; private set; }
    public int Mortality { get; private set; }
    public bool HumanInfection { get; private set; }
    public int? HumansInfected { get; private set; }
    public int? HumansExposed { get; private set; }
    public int? HumansMortality { get; private set; }
    public bool IsOngoing { get; private set; }
    public bool IsVerified { get; private set; }
    public bool IsNotified { get; private set; }
    public DateTime NotificationSent { get; private set; }
    public ReportType ReportType { get; private set; }
    public ReportStatus ReportStatus { get; private set; }
    public decimal? Longitude { get; private set; }
    public decimal? Latitude { get; private set; }
    public bool StampingOut { get; private set; }
    public bool DestructionOfCorpses { get; private set; }
    public int? CorpsesDestroyed { get; private set; }
    public bool Disinfection { get; private set; }
    public bool Observation { get; private set; }
    public string? ObservationDuration { get; private set; }
    public bool Quarantine { get; private set; }
    public string? QuarantineDuration { get; private set; }
    public bool MovementControl { get; private set; }
    public string? MovementControlMeasures { get; private set; }
    public bool Treatment { get; private set; }
    public string? TreatmentDetails { get; private set; }
    public string? CvoComment { get; private set; }

    public long OccurrenceId { get; private set; }
    public Occurrence Occurrence { get; private set; }
    public long DiseaseId { get; private set; }
    public Disease Disease { get; private set; }
    public long SpeciesId { get; private set; }
    public Species Species { get; private set; }

    public int NotifiabilityPoints { get; private set; }

    private readonly List<Medication> _medications = new List<Medication>();
    public virtual IReadOnlyCollection<Medication> Medications => _medications.AsReadOnly();

    private readonly List<DiagnosticTest> _diagnosticTests = new();
    public virtual IReadOnlyCollection<DiagnosticTest> DiagnosticTests => _diagnosticTests.AsReadOnly();

    private readonly List<Vaccination> _vaccinations = new();
    public virtual IReadOnlyCollection<Vaccination> Vaccinations => _vaccinations.AsReadOnly();

    public string OccurrenceLocation => $"{(Occurrence?.Community != null ? $"{Occurrence?.Community?.Name}, " : string.Empty)}{(Occurrence?.District != null ? $"{Occurrence?.District?.Name}, " : string.Empty)}{(Occurrence?.Municipality != null ? $"{Occurrence?.Municipality?.Name}, " : string.Empty)}{Occurrence?.Region?.Name}, {Occurrence?.Region?.Country?.Name}";

    private Report() : base()
    {
    }

    private Report(long occurrenceId, long diseaseId, long speciesId, DateOnly occurrenceDate) : this()
    {
        OccurrenceId = occurrenceId;
        DiseaseId = diseaseId;
        SpeciesId = speciesId;
        OccurrenceDate = occurrenceDate;
        IsOngoing = true;
    }

    public static Report Create(long occurrenceId, long diseaseId, long speciesId, DateOnly occurrenceDate)
    {
        Guard.IsNotNull(occurrenceId, nameof(occurrenceId));
        Guard.IsNotNull(diseaseId, nameof(diseaseId));
        Guard.IsNotNull(speciesId, nameof(speciesId));
        Guard.IsNotNull(occurrenceDate, nameof(occurrenceDate));

        return new Report(occurrenceId, diseaseId, speciesId, occurrenceDate);
    }

    public void UpdateTreatmentDetails(string details)
    {
        Guard.IsNotNullOrEmpty(details, nameof(details));

        TreatmentDetails = details;
    }

    public void SetNotifiabilityPoints(int points)
    {
        NotifiabilityPoints = points;
    }

    public void AddMedication(string name, string dosage)
    {
        var medication = Medication.Create(Id, name, dosage);
        _medications.Add(medication);
    }

    public void AddDiagnosticTest(string name, int numberTested, int numberPositive, int numberNegative, long professionalId)
    {
        var test = DiagnosticTest.Create(Id, name, numberTested, numberPositive, numberNegative, professionalId);
        _diagnosticTests.Add(test);
    }

    public void AddVaccination(string name, int numberVaccinated, bool human, bool animal, long? professionalId = null)
    {
        var vacc = Vaccination.Create(Id, name, numberVaccinated, human, animal, professionalId);
        _vaccinations.Add(vacc);
    }

    public void UpdateActions(bool destructionOfCorpses, bool disinfection, bool observation, bool quarantine, bool movementControl, bool treatment, string? treatmentDetails = null)
    {
        DestructionOfCorpses = destructionOfCorpses;
        Disinfection = disinfection;
        Observation = observation;
        Quarantine = quarantine;
        MovementControl = movementControl;
        Treatment = treatment;
        TreatmentDetails = treatmentDetails;
    }

    public void UpdateInfectionInfo(int numberExposed, int numberInfected, int mortality, bool humanInfection, int? humansExposed, int? humansInfected, int? humansMortality)
    {
        NumberExposed = numberExposed;
        NumberInfected = numberInfected;
        Mortality = mortality;
        HumanInfection = humanInfection;
        HumansExposed = humansExposed;
        HumansInfected = humansInfected;
        HumansMortality = humansMortality;
    }

    public void UpdateTreatmentInfo(bool stampingOut, bool destructionOfCorpses, int? corpsesDestroyed, bool disinfection, bool observation, string? observationDuration, bool quarantine, string? quarantineDuration, bool movementControl, string? movementControlMeasures, bool treatment)
    {
        StampingOut = stampingOut;
        DestructionOfCorpses = destructionOfCorpses;
        CorpsesDestroyed = corpsesDestroyed;
        Disinfection = disinfection;
        Observation = observation;
        ObservationDuration = observationDuration;
        Quarantine = quarantine;
        QuarantineDuration = quarantineDuration;
        MovementControl = movementControl;
        MovementControlMeasures = movementControlMeasures;
        Treatment = treatment;
    }

    public void Verify(string? cvoComment, ReportStatus reportStatus)
    {
        LastModified = DateTime.UtcNow;
        CvoComment = cvoComment;
        ReportStatus = reportStatus;
    }

    public void Delete()
    {
        DeleteMedications();
        DeleteDiagnosticTests();
        DeleteVaccinations();

        IsDeleted = true;
        LastModified = DateTime.UtcNow;
    }

    public void DeleteMedications()
    {
        foreach (var medication in _medications)
            medication.Delete();
    }

    public void DeleteDiagnosticTests()
    {
        foreach (var test in _diagnosticTests)
            test.Delete();
    }

    public void DeleteVaccinations()
    {
        foreach (var vacc in _vaccinations)
            vacc.Delete();
    }

    public void SetNotificationSendStatus()
    {
        IsNotified = true;
        NotificationSent = DateTime.UtcNow;
        LastModified = DateTime.UtcNow;
    }
}
