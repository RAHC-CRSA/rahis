using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RegionalAnimalHealth.Domain.Entities.Reports;

namespace RegionalAnimalHealth.Infrastructure.Persistence.Configurations.Reports;
public class VaccinationConfiguration : IEntityTypeConfiguration<Vaccination>
{
    public void Configure(EntityTypeBuilder<Vaccination> builder)
    {
        builder.ToTable($"{nameof(Vaccination)}s");
    }
}
