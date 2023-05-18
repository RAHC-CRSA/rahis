using System.Linq.Expressions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models.Reports;
using RegionalAnimalHealth.Domain.Entities.Reports;
using RegionalAnimalHealth.Domain.Exceptions;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Queries.GetVaccinationTypes;
public class GetVaccinationTypesQuery : IRequest<List<VaccinationTypeDto>>
{
}

public class GetVaccinationTypesQueryHandler : IRequestHandler<GetVaccinationTypesQuery, List<VaccinationTypeDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<GetVaccinationTypesQuery> _logger;

    public GetVaccinationTypesQueryHandler(IApplicationDbContext context, ILogger<GetVaccinationTypesQuery> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<List<VaccinationTypeDto>> Handle(GetVaccinationTypesQuery request, CancellationToken cancellationToken)
    {
        try
        {
            return await _context.VaccinationTypes
                .Where(x => !x.IsDeleted)
                .Select(VaccinationTypesSelectorExpression())
                .ToListAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            throw new BusinessRuleException(nameof(GetVaccinationTypesQuery), ex.Message);
        }
    }

    private Expression<Func<VaccinationType, VaccinationTypeDto>> VaccinationTypesSelectorExpression()
    {
        return e => new VaccinationTypeDto
        {
            Id = e.Id,
            Name = e.Name
        };
    }
}