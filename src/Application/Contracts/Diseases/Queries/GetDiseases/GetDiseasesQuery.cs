using System.Linq.Expressions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Reports;
using RegionalAnimalHealth.Application.Contracts.Regions.Queries.GetCountries;
using RegionalAnimalHealth.Domain.Entities.Reports;
using RegionalAnimalHealth.Domain.Exceptions;

namespace RegionalAnimalHealth.Application.Contracts.Diseases.Queries.GetDiseases;
public class GetDiseasesQuery : IRequest<(Result, List<DiseaseDto>?)>
{
}

public class GetDiseasesQueryHandler : IRequestHandler<GetDiseasesQuery, (Result, List<DiseaseDto>?)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<GetDiseasesQuery> _logger;

    public GetDiseasesQueryHandler(IApplicationDbContext context, ILogger<GetDiseasesQuery> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(Result, List<DiseaseDto>?)> Handle(GetDiseasesQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var diseases = await _context.Diseases
                .Where(x => !x.IsDeleted)
                .Select(DiseaseSelectorExpression())
                .ToListAsync();

            return (Result.Success(), diseases);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            throw new BusinessRuleException(nameof(GetCountriesQuery), ex.Message);
        }
    }

    private Expression<Func<Disease, DiseaseDto>> DiseaseSelectorExpression()
    {
        return e => new DiseaseDto
        {
            Id = e.Id,
            Name = e.Name,
            Zoonotic = e.Zoonotic,
            Code = e.Code,
            Classification = e.Classification
        };
    }
}
