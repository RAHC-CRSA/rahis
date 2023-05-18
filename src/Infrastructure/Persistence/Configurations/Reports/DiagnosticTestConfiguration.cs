using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RegionalAnimalHealth.Domain.Entities.Reports;

namespace RegionalAnimalHealth.Infrastructure.Persistence.Configurations.Reports;
public class DiagnosticTestConfiguration : IEntityTypeConfiguration<DiagnosticTest>
{
    public void Configure(EntityTypeBuilder<DiagnosticTest> builder)
    {
        builder.ToTable($"{nameof(DiagnosticTest)}s");
    }
}
