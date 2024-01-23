using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RegionalAnimalHealth.Domain.Entities.Reports;

namespace RegionalAnimalHealth.Infrastructure.Persistence.Configurations.Reports;
public class ControlMeasureConfiguration : IEntityTypeConfiguration<ControlMeasure>
{
    public void Configure(EntityTypeBuilder<ControlMeasure> builder)
    {
        builder.ToTable($"{nameof(ControlMeasure)}s");

        builder.HasIndex(x => x.Code).IsUnique();
    }
}
