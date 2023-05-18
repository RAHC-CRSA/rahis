using Microsoft.EntityFrameworkCore;
using RegionalAnimalHealth.Domain.Entities.Regions;
using RegionalAnimalHealth.Domain.Entities.Reports;

namespace RegionalAnimalHealth.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<Country> Countries { get; }
    DbSet<DiagnosticTest> DiagnosticTests { get; }
    DbSet<DiagnosticTestType> DiagnosticTestTypes { get; }
    DbSet<Disease> Diseases { get; }
    DbSet<Occurrence> Occurrences { get; }
    DbSet<Region> Regions { get; }
    DbSet<Report> Reports { get; }
    DbSet<Species> Species { get; }
    DbSet<TransboundaryDisease> TransboundaryDiseases { get; }
    DbSet<Vaccination> Vaccinations { get; }
    DbSet<VaccinationType> VaccinationTypes { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
