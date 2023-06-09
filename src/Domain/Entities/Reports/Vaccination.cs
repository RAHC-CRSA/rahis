using CommunityToolkit.Diagnostics;
using RegionalAnimalHealth.Domain.Entities.Personas;

namespace RegionalAnimalHealth.Domain.Entities.Reports; 

public class Vaccination : BaseAuditableEntity<long> {
    public string Name { get; private set; }
    public int NumberVaccinated { get; private set; }
    public long ReportId { get; private set; }
    public bool IsHuman { get; private set; }
    public bool IsAnimal { get; private set; }
    public long? ProfessionalId { get; private set; }
    public virtual ParaProfessional Professional { get; private set; }

    private Vaccination() : base()
    {
    }

    private Vaccination(long reportId, string name, int numberVaccinated, bool human, bool animal, long? professionalId) : this()
    {
        ReportId = reportId;
        Name = name;
        NumberVaccinated = numberVaccinated;
        IsHuman = human;
        IsAnimal = animal;
        ProfessionalId = professionalId;
    }

    public static Vaccination Create(long reportId, string name, int numberVaccinated, bool human, bool animal, long? professionalId = null)
    {
        Guard.IsNotNull(reportId, nameof(reportId));
        Guard.IsNotNullOrEmpty(name, nameof(name));
        Guard.IsNotNull(numberVaccinated, nameof(numberVaccinated));

        return new Vaccination(reportId, name, numberVaccinated, human, animal, professionalId);
    }

    public void Delete()
    {
        IsDeleted = true;
        LastModified = DateTime.UtcNow;
    }

}
