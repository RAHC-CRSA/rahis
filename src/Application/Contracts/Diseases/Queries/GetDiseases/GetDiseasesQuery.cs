﻿using System.Linq.Expressions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Reports;
using RegionalAnimalHealth.Domain.Entities.Reports;

namespace RegionalAnimalHealth.Application.Contracts.Diseases.Queries.GetDiseases;
public class GetCrossBoundaryDiseasesQuery : IRequest<(Result, List<DiseaseDto>?)>
{
}

public class GetDiseasesQueryHandler : IRequestHandler<GetCrossBoundaryDiseasesQuery, (Result, List<DiseaseDto>?)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<GetCrossBoundaryDiseasesQuery> _logger;

    public GetDiseasesQueryHandler(IApplicationDbContext context, ILogger<GetCrossBoundaryDiseasesQuery> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(Result, List<DiseaseDto>?)> Handle(GetCrossBoundaryDiseasesQuery request, CancellationToken cancellationToken)
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
            Code = e.Code,
            Classification = e.Classification
        };
    }
}
