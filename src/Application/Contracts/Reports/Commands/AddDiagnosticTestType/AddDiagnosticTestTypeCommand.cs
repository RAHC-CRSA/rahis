using MediatR;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Reports;
using RegionalAnimalHealth.Domain.Entities.Reports;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Commands.AddDiagnosticTestType;
public class AddDiagnosticTestTypeCommand : IRequest<(Result, DiagnosticTestTypeDto?)>
{
    public string Name { get; set; }
}

public class AddDiagnosticTestTypeCommandHandler : IRequestHandler<AddDiagnosticTestTypeCommand, (Result, DiagnosticTestTypeDto?)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<AddDiagnosticTestTypeCommand> _logger;

    public AddDiagnosticTestTypeCommandHandler(IApplicationDbContext context, ILogger<AddDiagnosticTestTypeCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(Result, DiagnosticTestTypeDto?)> Handle(AddDiagnosticTestTypeCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var testType = DiagnosticTestType.Create(request.Name);

            await _context.DiagnosticTestTypes.AddAsync(testType);
            await _context.SaveChangesAsync(cancellationToken);

            var data = new DiagnosticTestTypeDto
            {
                Id = testType.Id,
                Name = testType.Name,
            };

            return (Result.Success(), data);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return (Result.Failure(new List<string> { ex.Message }), null);
        }
    }
}
