using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RegionalAnimalHealth.Domain.Entities.Personas;

namespace RegionalAnimalHealth.Infrastructure.Persistence.Configurations.Personas;
public class ParaProfessionalConfiguration : IEntityTypeConfiguration<ParaProfessional>
{
    public void Configure(EntityTypeBuilder<ParaProfessional> builder)
    {
        builder.ToTable($"{nameof(ParaProfessional)}s");
    }
}
