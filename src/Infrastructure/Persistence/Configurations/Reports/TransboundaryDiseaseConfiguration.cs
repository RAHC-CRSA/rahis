using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RegionalAnimalHealth.Domain.Entities.Reports;

namespace RegionalAnimalHealth.Infrastructure.Persistence.Configurations.Reports;
public class TransboundaryDiseaseConfiguration : IEntityTypeConfiguration<TransboundaryDisease>
{
    public void Configure(EntityTypeBuilder<TransboundaryDisease> builder)
    {
        builder.ToTable($"{nameof(TransboundaryDisease)}s");
    }
}
