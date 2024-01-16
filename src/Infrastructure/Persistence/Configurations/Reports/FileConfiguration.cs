using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using File = RegionalAnimalHealth.Domain.Entities.Reports.File;

namespace RegionalAnimalHealth.Infrastructure.Persistence.Configurations.Reports;
public class FileConfiguration : IEntityTypeConfiguration<File>
{
    public void Configure(EntityTypeBuilder<File> builder)
    {
        builder.ToTable($"{nameof(File)}s");
    }
}
