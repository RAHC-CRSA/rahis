using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using RegionalAnimalHealth.Domain.Entities.Reports;

namespace RegionalAnimalHealth.Infrastructure.Persistence.Configurations.Reports;
public class NotificationRecipientConfiguration : IEntityTypeConfiguration<NotificationRecipient>
{
    public void Configure(EntityTypeBuilder<NotificationRecipient> builder)
    {
        builder.ToTable($"{nameof(NotificationRecipient)}s");
    }
}
