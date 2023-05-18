using CommunityToolkit.Diagnostics;

namespace RegionalAnimalHealth.Domain.Entities.Reports;
public class Report : BaseAuditableEntity<long>
{
    public DateOnly OccurenceDate { get; private set; }
    public int NumberInfected { get; private set; }
    public int NumberExposed { get; private set; }
    public bool IsOngoing { get; private set; }
    public bool IsVerified { get; private set; }
    public int Mortality { get; private set; }
    public ReportType ReportType { get; private set; }
    public decimal? Longitude { get; private set; }
    public decimal? Latitude { get; private set; }
    public bool StampingOut { get; set; }
    public bool DestructionOfCorpses { get; private set; }
    public bool Disinfection { get; private set; }
    public bool Observation { get; private set; }
    public bool Quarantine { get; private set; }
    public bool MovementControl { get; private set; }
    public bool Treatment { get; private set; }
    public string? TreatmentDetails { get; private set; }

    public long OccurrenceId { get; private set; }
    public Occurrence Occurrence { get; set; }
    public long DiseaseId { get; private set; }
    public Disease Disease { get; private set; }
    public long SpeciesId { get; private set; }

    private readonly List<DiagnosticTest> _diagnosticTests = new();
    public virtual IReadOnlyCollection<DiagnosticTest> DiagnosticTests => _diagnosticTests.AsReadOnly();

    private readonly List<Vaccination> _vaccinations = new();
    public virtual IReadOnlyCollection<Vaccination> Vaccinations => _vaccinations.AsReadOnly();

    private Report()
    {
    }

    private Report(long occurrenceId, long diseaseId, long speciesId, int numberExposed, int numberInfected, int mortality, DateOnly occurenceDate) : this()
    {
        OccurrenceId = occurrenceId;
        DiseaseId = diseaseId;
        SpeciesId = speciesId;
        NumberExposed = numberExposed;
        NumberInfected = numberInfected;
        Mortality = mortality;
        OccurenceDate = occurenceDate;
        IsOngoing = true;
    }

    public static Report Create(long occurrenceId, long diseaseId, long speciesId, int numberExposed, int numberInfected, int mortality, DateOnly occurenceDate)
    {
        Guard.IsNotNull(occurrenceId, nameof(occurrenceId));
        Guard.IsNotNull(diseaseId, nameof(diseaseId));
        Guard.IsNotNull(speciesId, nameof(speciesId));
        Guard.IsNotNull(occurenceDate, nameof(occurenceDate));

        return new Report(occurrenceId, diseaseId, speciesId, numberExposed, numberInfected, mortality, occurenceDate);
    }

    public void AddDiagnosticTest(long diagnosticTestTypeId, int numberTested, long professionalId, long? institutionId = null)
    {
        var test = DiagnosticTest.Create(Id, diagnosticTestTypeId, numberTested, professionalId, institutionId);
        _diagnosticTests.Add(test);
    }

    public void AddVaccination(long vaccinationTypeId, int numberVaccinated, long diseaseId, long? institutionId = null)
    {
        var vacc = Vaccination.Create(Id, vaccinationTypeId, numberVaccinated, diseaseId, institutionId);
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

    public void Delete()
    {
        DeleteDiagnosticTests();
        DeleteVaccinations();

        IsDeleted = true;
        LastModified = DateTime.UtcNow;
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
}
