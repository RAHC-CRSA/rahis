using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RegionalAnimalHealth.Domain.Entities.Regions;

namespace RegionalAnimalHealth.Infrastructure.Persistence.Configurations.Regions;
public class MunicipalityConfiguration : IEntityTypeConfiguration<Municipality>
{
    public void Configure(EntityTypeBuilder<Municipality> builder)
    {
        builder.ToTable("Municipalities");
    }
}
