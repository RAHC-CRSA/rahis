using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RegionalAnimalHealth.Domain.Entities.Regions;

namespace RegionalAnimalHealth.Infrastructure.Persistence.Configurations.Regions;
public class DistrictConfiguration : IEntityTypeConfiguration<District>
{
    public void Configure(EntityTypeBuilder<District> builder)
    {
        builder.ToTable($"{nameof(District)}s");
    }
}
