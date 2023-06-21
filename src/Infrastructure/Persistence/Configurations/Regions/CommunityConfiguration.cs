using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RegionalAnimalHealth.Domain.Entities.Regions;

namespace RegionalAnimalHealth.Infrastructure.Persistence.Configurations.Regions;
public class CommunityConfiguration : IEntityTypeConfiguration<Community>
{
    public void Configure(EntityTypeBuilder<Community> builder)
    {
        builder.ToTable($"Communities");
    }
}
