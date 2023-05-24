using System.Linq.Expressions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Species;
using RegionalAnimalHealth.Domain.Exceptions;

namespace RegionalAnimalHealth.Application.Contracts.Species.Queries.GetSpecies;
public class GetSpeciesQuery : IRequest<(Result, List<SpeciesDto>?)>
{
}

public class GetSpeciesQueryHandler : IRequestHandler<GetSpeciesQuery, (Result, List<SpeciesDto>?)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<GetSpeciesQuery> _logger;

    public GetSpeciesQueryHandler(IApplicationDbContext context, ILogger<GetSpeciesQuery> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(Result, List<SpeciesDto>?)> Handle(GetSpeciesQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var species = await _context.Species.Where(x => !x.IsDeleted).Select(SpeciesSelectorExpression()).ToListAsync();

            return (Result.Success(),  species);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
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
