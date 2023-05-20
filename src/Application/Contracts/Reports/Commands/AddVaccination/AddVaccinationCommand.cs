using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Domain.Exceptions;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Commands.AddVaccination;
public class AddVaccinationCommand : IRequest<Result>
{
    public long ReportId { get; set; }
    public string Name { get; set; }
    public int NumberVaccinated { get; set; }
    public bool Human { get; set; }
    public bool Animal { get; set; }
    public long? ProfessionalId { get; set; }
}

public class AddVaccinationCommandHandler : IRequestHandler<AddVaccinationCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<AddVaccinationCommand> _logger;

    public AddVaccinationCommandHandler(IApplicationDbContext context, ILogger<AddVaccinationCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<Result> Handle(AddVaccinationCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var report = await _context.Reports.Where(x => !x.IsDeleted && x.Id == request.ReportId).FirstOrDefaultAsync();

            if (report == null)
            {
                var message = "Specified report does not exist.";
                _logger.LogDebug(message, request.ReportId);
                return Result.Failure(new List<string> { message });
            }

            report.AddVaccination(request.Name, request.NumberVaccinated, request.Human, request.Animal, request.ProfessionalId);

            _context.Reports.Update(report);
            await _context.SaveChangesAsync(cancellationToken);

            return Result.Success();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message, request);
            return Result.Failure(new List<string> { ex.Message });
        }
    }
}
