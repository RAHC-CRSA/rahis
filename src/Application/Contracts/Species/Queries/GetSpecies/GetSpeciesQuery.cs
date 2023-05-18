using System.Linq.Expressions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models.Species;
using RegionalAnimalHealth.Domain.Exceptions;
using RegionalAnimalHealth.Domain.Entities.Reports;

namespace RegionalAnimalHealth.Application.Contracts.Species.Queries.GetSpecies;
public class GetSpeciesQuery : IRequest<List<SpeciesDto>>
{
}

public class GetSpeciesQueryHandler : IRequestHandler<GetSpeciesQuery, List<SpeciesDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<GetSpeciesQuery> _logger;

    public GetSpeciesQueryHandler(IApplicationDbContext context, ILogger<GetSpeciesQuery> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<List<SpeciesDto>> Handle(GetSpeciesQuery request, CancellationToken cancellationToken)
    {
        try
        {
            return await _context.Species.Where(x => !x.IsDeleted).Select(SpeciesSelectorExpression()).ToListAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            throw new BusinessRuleException(nameof(GetSpeciesQuery), ex.Message);
        }
    }

    private Expression<Func<Domain.Entities.Reports.Species, SpeciesDto>> SpeciesSelectorExpression()
    {
        return e => new SpeciesDto
        {
            Id = e.Id,
            Name = e.Name
        };
    }

}
