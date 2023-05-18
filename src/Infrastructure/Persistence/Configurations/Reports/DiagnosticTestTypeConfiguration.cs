using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RegionalAnimalHealth.Domain.Entities.Reports;

namespace RegionalAnimalHealth.Infrastructure.Persistence.Configurations.Reports;
public class DiagnosticTestTypeConfiguration : IEntityTypeConfiguration<DiagnosticTestType>
{
    public void Configure(EntityTypeBuilder<DiagnosticTestType> builder)
    {
        builder.ToTable($"{nameof(DiagnosticTestType)}s");
    }
}
