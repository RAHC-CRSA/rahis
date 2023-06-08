using CommunityToolkit.Diagnostics;

namespace RegionalAnimalHealth.Domain.Entities.Personas;
public class ParaProfessional : BaseAuditableEntity<long>
{
    public string Name { get; private set; }
    public string Email { get; private set; }
    public string Phone { get; private set; }
    public string Position { get; private set; }
    public long? InstitutionId { get; private set; }
    public virtual Institution Institution { get; set; }

    private ParaProfessional()
    {
    }

    private ParaProfessional(string name, string email, string phone, string position, long? institutionId) : this()
    {
        Name = name;
        Email = email;
        Phone = phone;
        Position = position;
        InstitutionId = institutionId;
    }

    public static ParaProfessional Create(string name, string email, string phone, string position, long? institutionId = null)
    {
        Guard.IsNotNullOrEmpty(name, nameof(name));
        Guard.IsNotNullOrEmpty(email, nameof(email));
        Guard.IsNotNullOrEmpty(phone, nameof(phone));
        Guard.IsNotNullOrEmpty(position, nameof(position));

        return new ParaProfessional(name, email, phone, position, institutionId);
    }

    public void Delete()
    {
        IsDeleted = true;
        LastModified = DateTime.Now;
    }
}
