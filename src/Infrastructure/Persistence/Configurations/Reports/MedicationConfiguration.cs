using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RegionalAnimalHealth.Domain.Entities.Reports;

namespace RegionalAnimalHealth.Infrastructure.Persistence.Configurations.Reports;
public class MedicationConfiguration : IEntityTypeConfiguration<Medication>
{
    public void Configure(EntityTypeBuilder<Medication> builder)
    {
        builder.ToTable($"{nameof(Medication)}s");
    }
}
