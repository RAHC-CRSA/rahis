using System.Linq.Expressions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models.Reports;
using RegionalAnimalHealth.Application.Contracts.Regions.Queries.GetCountries;
using RegionalAnimalHealth.Domain.Entities.Reports;
using RegionalAnimalHealth.Domain.Exceptions;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Queries.GetDiagnosticTestTypes;
public class GetDiagnosticTestTypesQuery : IRequest<List<DiagnosticTestTypeDto>>
{
}

public class GetDiagnosticTestTypesQueryHandler : IRequestHandler<GetDiagnosticTestTypesQuery, List<DiagnosticTestTypeDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<GetDiagnosticTestTypesQuery> _logger;

    public GetDiagnosticTestTypesQueryHandler(IApplicationDbContext context, ILogger<GetDiagnosticTestTypesQuery> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<List<DiagnosticTestTypeDto>> Handle(GetDiagnosticTestTypesQuery request, CancellationToken cancellationToken)
    {
        try
        {
            return await _context.DiagnosticTestTypes
                .Where(x => !x.IsDeleted)
                .Select(DiagnosticTestTypesSelectorExpression())
                .ToListAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            throw new BusinessRuleException(nameof(GetDiagnosticTestTypesQuery), ex.Message);
        }
    }

    private Expression<Func<DiagnosticTestType, DiagnosticTestTypeDto>> DiagnosticTestTypesSelectorExpression()
    {
        return e => new DiagnosticTestTypeDto
        {
            Id = e.Id,
            Name = e.Name,
        };
    }
}
