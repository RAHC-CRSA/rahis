﻿using CommunityToolkit.Diagnostics;
using RegionalAnimalHealth.Domain.Entities.Regions;

namespace RegionalAnimalHealth.Domain.Entities.Personas;
public class ParaProfessional : BaseAuditableEntity<long>
{
    public string Name { get; private set; }
    public string Email { get; private set; }
    public string Phone { get; private set; }
    public string Position { get; private set; }
    public long? InstitutionId { get; private set; }
    public virtual Institution Institution { get; set; }
    public long? CountryId { get; private set; }
    public virtual Country Country { get; private set; }

    private ParaProfessional() : base()
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

    public static ParaProfessional Create(string name, string email, string phone, string position, long? institutionId)
    {
        Guard.IsNotNullOrEmpty(name, nameof(name));
        Guard.IsNotNullOrEmpty(email, nameof(email));
        Guard.IsNotNullOrEmpty(phone, nameof(phone));
        Guard.IsNotNullOrEmpty(position, nameof(position));
        Guard.IsNotNull(institutionId, nameof(institutionId));

        return new ParaProfessional(name, email, phone, position, institutionId);
    }

    public void Delete()
    {
        IsDeleted = true;
        LastModified = DateTime.Now;
    }

    public void Update(string phone, string email, string position)
    {
        Guard.IsNotNullOrEmpty(phone, nameof(phone));
        Guard.IsNotNullOrEmpty(email, nameof(email));
        Guard.IsNotNullOrEmpty(position, nameof(position));

        Phone = phone.Trim();
        Email = email.Trim();
        Position = position;
    }
}
