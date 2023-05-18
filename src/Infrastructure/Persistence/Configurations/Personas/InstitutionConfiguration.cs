using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RegionalAnimalHealth.Domain.Entities.Personas;

namespace RegionalAnimalHealth.Infrastructure.Persistence.Configurations.Personas;
public class InstitutionConfiguration : IEntityTypeConfiguration<Institution>
{
    public void Configure(EntityTypeBuilder<Institution> builder)
    {
        builder.ToTable($"{nameof(Institution)}s");
    }
}
