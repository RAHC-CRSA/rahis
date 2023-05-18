namespace RegionalAnimalHealth.Application.Common.Models.Reports;
public class ReportDto
{
    public long? Id { get; set; }

    public long OccurrenceId { get; set; }
    public long DiseaseId { get; set; }
    public long SpeciesId { get; set; }

    public int Infected { get; set; }
    public int Exposed { get; set; }
    public int Mortality { get; set; }

    public bool IsOngoing { get; set; }
    public bool IsVerified { get; set; }

    public bool StampingOut { get; set; }
    public bool DestructionOfCorpses { get; set; }
    public bool Disinfection { get; set; }
    public bool Observation { get; set; }
    public bool Quarantine { get; set; }
    public bool MovementControl { get; set; }
    public bool Treatment { get; set; }
}
