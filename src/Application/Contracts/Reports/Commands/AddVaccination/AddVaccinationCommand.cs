using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Reports;
using RegionalAnimalHealth.Domain.Entities.Reports;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Commands.AddVaccination;
public class AddVaccinationCommand : IRequest<(Result, VaccinationDto?)>
{
    public long ReportId { get; set; }
    public string Name { get; set; }
    public int NumberVaccinated { get; set; }
    public bool Human { get; set; }
    public bool Animal { get; set; }
    public long? ProfessionalId { get; set; }
}

public class AddVaccinationCommandHandler : IRequestHandler<AddVaccinationCommand, (Result, VaccinationDto?)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<AddVaccinationCommand> _logger;

    public AddVaccinationCommandHandler(IApplicationDbContext context, ILogger<AddVaccinationCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(Result, VaccinationDto?)> Handle(AddVaccinationCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var report = await _context.Reports.Where(x => !x.IsDeleted && x.Id == request.ReportId).FirstOrDefaultAsync();

            if (report == null)
            {
                var message = "Specified report does not exist.";
                _logger.LogDebug(message, request.ReportId);
                return (Result.Failure(new List<string> { message }), null);
            }

            var vaccination = Vaccination.Create(report.Id, request.Name, request.NumberVaccinated, request.Human, request.Animal, request.ProfessionalId);

            await _context.Vaccinations.AddAsync(vaccination);
            await _context.SaveChangesAsync(cancellationToken);

            var data = new VaccinationDto
            {
                Id = vaccination.Id,
                Name = vaccination.Name,
                ReportId = vaccination.ReportId,
                IsHuman = vaccination.IsHuman,
                IsAnimal = vaccination.IsAnimal,
                ProfessionalId = vaccination.ProfessionalId,
            };

            return (Result.Success(), data);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return (Result.Failure(new List<string> { ex.Message }), null);
        }
    }
}
