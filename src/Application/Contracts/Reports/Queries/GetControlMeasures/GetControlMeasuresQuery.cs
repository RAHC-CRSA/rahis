using System.Linq.Expressions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Reports;
using RegionalAnimalHealth.Domain.Entities.Reports;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Queries.GetControlMeasures;
public class GetControlMeasuresQuery : IRequest<(Result, List<ControlMeasureDto>?)>
{
}

public class GetControlMeasuresQueryHandler : IRequestHandler<GetControlMeasuresQuery, (Result, List<ControlMeasureDto>?)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<GetControlMeasuresQuery> _logger;

    public GetControlMeasuresQueryHandler(IApplicationDbContext context, ILogger<GetControlMeasuresQuery> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(Result, List<ControlMeasureDto>?)> Handle(GetControlMeasuresQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var controlMeasures = await _context.ControlMeasures
                .Where(x => !x.IsDeleted)
                .Select(ControlMeasureSelectorExpression())
                .ToListAsync();

            return (Result.Success(), controlMeasures);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return (Result.Failure(new List<string> { ex.Message }), null);
        }
    }

    private Expression<Func<ControlMeasure, ControlMeasureDto>> ControlMeasureSelectorExpression()
    {
        return e => new ControlMeasureDto
        {
            Id = e.Id,
            Name = e.Name,
            Code = e.Code
        };
    }
}
