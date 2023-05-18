using CommunityToolkit.Diagnostics;

namespace RegionalAnimalHealth.Domain.Entities.Reports;
public class TransboundaryDisease : BaseAuditableEntity<long>
{
    public long DiseaseId { get; private set; }
    public virtual Disease Disease { get; private set; }
    public long SpeciesId { get; private set; }
    public virtual Species Species { get; private set; }

    private TransboundaryDisease()
    {
    }

    private TransboundaryDisease(long diseaseId, long speciesId) : this()
    {
        DiseaseId = diseaseId;
        SpeciesId = speciesId;
    }

    public static TransboundaryDisease Create(long diseaseId, long speciesId)
    {
        Guard.IsNotNull(diseaseId, nameof(diseaseId));
        Guard.IsNotNull(speciesId, nameof(speciesId));

        return new TransboundaryDisease(diseaseId, speciesId);
    }

    public void Delete()
    {
        IsDeleted = true;
        LastModified = DateTime.UtcNow;
    }
}
