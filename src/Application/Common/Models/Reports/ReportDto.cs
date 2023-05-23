namespace RegionalAnimalHealth.Application.Common.Models.Reports;
public class ReportDto
{
    public long? Id { get; set; }

    public long OccurrenceId { get; set; }
    public string OccurrenceTitle { get; set; }
    public long DiseaseId { get; set; }
    public long SpeciesId { get; set; }

    public string Location { get; set; }
    public string Created { get; set; }

    public int Infected { get; set; }
    public int Exposed { get; set; }
    public int Mortality { get; set; }

    public int? HumansInfected { get; set; }
    public int? HumansExposed { get; set; }
    public int? HumansMortality { get; set; }

    public bool IsOngoing { get; set; }
    public bool IsVerified { get; set; }

    public bool StampingOut { get; set; }
    public bool DestructionOfCorpses { get; set; }
    public bool Disinfection { get; set; }
    public bool Observation { get; set; }
    public string? ObservationDuration { get; set; }
    public bool Quarantine { get; set; }
    public string? QuarantineDuration { get; set; }
    public bool MovementControl { get; set; }
    public string? MovementControlMeasures { get; set; }
    public bool Treatment { get; set; }
    public string? TreatmentDetails { get; set; }

    public List<MedicationDto> Medications { get; set; }
    public List<DiagnosticTestDto> DiagnosticTests { get; set; }
    public List<VaccinationDto> Vaccinations { get; set; }
}
