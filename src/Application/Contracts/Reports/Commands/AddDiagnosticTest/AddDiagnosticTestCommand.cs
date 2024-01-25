using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Reports;
using RegionalAnimalHealth.Domain.Entities.Reports;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Commands.AddDiagnosticTest;
public class AddDiagnosticTestCommand : IRequest<(Result, DiagnosticTestDto?)>
{
    public long ReportId { get; set; }
    public string Name { get; set; }
    public int NumberTested { get; set; }
    public int NumberPositive { get; set; }
    public int NumberNegative { get; set; }
    public long ProfessionalId { get; set; }
    public string? TestResultImage { get; set; } 
}

public class AddDiagnosticTestCommandHandler : IRequestHandler<AddDiagnosticTestCommand, (Result, DiagnosticTestDto?)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<AddDiagnosticTestCommand> _logger;

    public AddDiagnosticTestCommandHandler(IApplicationDbContext context, ILogger<AddDiagnosticTestCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(Result, DiagnosticTestDto?)> Handle(AddDiagnosticTestCommand request, CancellationToken cancellationToken)
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

            var diagnosticTest = DiagnosticTest.Create(report.Id, request.Name, request.NumberTested, request.NumberPositive, request.NumberNegative, request.ProfessionalId, request.TestResultImage);

            await _context.DiagnosticTests.AddAsync(diagnosticTest);
            await _context.SaveChangesAsync(cancellationToken);

            var data = new DiagnosticTestDto
            {
                Id = diagnosticTest.Id,
                Name = diagnosticTest.Name,
                ReportId = diagnosticTest.ReportId,
                NumberTested = diagnosticTest.NumberTested,
                NumberPositive = diagnosticTest.NumberPositive,
                NumberNegative = diagnosticTest.NumberNegative,
                ProfessionalId = diagnosticTest.ProfessionalId,
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
