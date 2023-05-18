using CommunityToolkit.Diagnostics;
using RegionalAnimalHealth.Domain.Entities.Personas;

namespace RegionalAnimalHealth.Domain.Entities.Reports; 

public class Vaccination : BaseAuditableEntity<long> {
    public long VaccinationTypeId { get; private set; }
    public int NumberVaccinated { get; private set; }
    public long ReportId { get; private set; }
    public long DiseaseId { get; private set; }
    public virtual Disease Disease { get; private set; }
    public long? InstitutionId { get; private set; }
    public virtual Institution Institution { get; private set; }
    public long? ProfessionalId { get; private set; }
    public virtual ParaProfessional Professional { get; private set; }

    private Vaccination()
    {
    }

    private Vaccination(long reportId, long vaccinationTypeId, int numberVaccinated, long diseaseId, long? institutionId) : this()
    {
        ReportId = reportId;
        VaccinationTypeId = vaccinationTypeId;
        NumberVaccinated = numberVaccinated;
        DiseaseId = diseaseId;
        InstitutionId = institutionId;
    }

    public static Vaccination Create(long reportId, long vaccinationTypeId, int numberVaccinated, long diseaseId, long? institutionId = null)
    {
        Guard.IsNotNull(reportId, nameof(reportId));
        Guard.IsNotNull(vaccinationTypeId, nameof(vaccinationTypeId));
        Guard.IsNotNull(numberVaccinated, nameof(numberVaccinated));
        Guard.IsNotNull(diseaseId, nameof(diseaseId));

        return new Vaccination(reportId, vaccinationTypeId, numberVaccinated, diseaseId, institutionId);
    }

    public void Delete()
    {
        IsDeleted = true;
        LastModified = DateTime.UtcNow;
    }

}
