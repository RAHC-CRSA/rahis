using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RegionalAnimalHealth.Domain.Entities.Reports;

namespace RegionalAnimalHealth.Infrastructure.Persistence.Configurations.Reports;
public class ReportConfiguration : IEntityTypeConfiguration<Report>
{
    public void Configure(EntityTypeBuilder<Report> builder)
    {
        builder.ToTable($"{nameof(Report)}s");

        builder.HasOne(p => p.Disease).WithMany().OnDelete(DeleteBehavior.Restrict);

        builder.Property(p => p.Longitude).HasColumnType("decimal(15,2)");
        builder.Property(p => p.Latitude).HasColumnType("decimal(15,2)");
    }
}
