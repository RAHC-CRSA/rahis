using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Domain.Exceptions;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Commands.AddDiagnosticTest;
public class AddDiagnosticTestCommand : IRequest<Result>
{
    public long ReportId { get; set; }
    public long TestId { get; set; }
    public int NumberTested { get; set; }
    public long ProfessionalId { get; set; }
    public long? InstitutionId { get; set; }
}

public class AddDiagnosticTestCommandHandler : IRequestHandler<AddDiagnosticTestCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<AddDiagnosticTestCommand> _logger;

    public AddDiagnosticTestCommandHandler(IApplicationDbContext context, ILogger<AddDiagnosticTestCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<Result> Handle(AddDiagnosticTestCommand request, CancellationToken cancellationToken)
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

            report.AddDiagnosticTest(request.TestId, request.NumberTested, request.ProfessionalId, request.InstitutionId);

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
