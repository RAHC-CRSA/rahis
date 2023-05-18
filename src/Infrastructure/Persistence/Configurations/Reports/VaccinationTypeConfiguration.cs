using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RegionalAnimalHealth.Domain.Entities.Reports;

namespace RegionalAnimalHealth.Infrastructure.Persistence.Configurations.Reports;
public class VaccinationTypeConfiguration : IEntityTypeConfiguration<VaccinationType>
{
    public void Configure(EntityTypeBuilder<VaccinationType> builder)
    {
        builder.ToTable($"{nameof(VaccinationType)}s");
    }
}
