namespace RegionalAnimalHealth.Domain.Entities.Reports;
public class File : BaseAuditableEntity<long>
{
    public string FileName { get; private set; }
    public string FilePath { get; private set; }
    public DateTime UploadTime { get; private set; }
}
