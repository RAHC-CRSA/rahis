using System.Linq.Expressions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Reports;
using RegionalAnimalHealth.Domain.Entities.Reports;

namespace RegionalAnimalHealth.Application.Contracts.Diseases.Queries.GetTransBoundaryDiseases;
public class GetTransBoundaryDiseasesQuery : IRequest<(Result, List<DiseaseDto>?)>
{
    public long? SpeciesId { get; set; }
}

public class GetTransBoundaryDiseasesQueryHandler : IRequestHandler<GetTransBoundaryDiseasesQuery, (Result, List<DiseaseDto>?)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<GetTransBoundaryDiseasesQuery> _logger;

    public GetTransBoundaryDiseasesQueryHandler(IApplicationDbContext context, ILogger<GetTransBoundaryDiseasesQuery> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(Result, List<DiseaseDto>?)> Handle(GetTransBoundaryDiseasesQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var diseases = await _context.TransboundaryDiseases
                .Where(x => !x.IsDeleted && request.SpeciesId != null ? x.SpeciesId == request.SpeciesId : true)
                .Include(x => x.Disease)
                .Select(x => x.Disease)
                .Select(DiseaseSelectorExpression())
                .ToListAsync();

            return (Result.Success(), diseases);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return (Result.Failure(new List<string> { ex.Message }), null);
        }
    }

    private Expression<Func<Disease, DiseaseDto>> DiseaseSelectorExpression()
    {
        return e => new DiseaseDto
        {
            Id = e.Id,
            Name = e.Name,
            IsZoonotic = e.IsZoonotic,
            IsPriority = e.IsPriority,
            IsNotifiable = e.IsNotifiable,
            Code = e.Code,
            Classification = e.Classification
        };
    }
}
