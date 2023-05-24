using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Institutions;
using RegionalAnimalHealth.Domain.Entities.Personas;

namespace RegionalAnimalHealth.Application.Contracts.Institutions.Queries.GetInstitutions;
public class GetInstitutionsQuery : IRequest<(Result, List<InstitutionDto>?)>
{
}

public class GetInstitutionsQueryHandler : IRequestHandler<GetInstitutionsQuery, (Result, List<InstitutionDto>?)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<GetInstitutionsQuery> _logger;

    public GetInstitutionsQueryHandler(IApplicationDbContext context, ILogger<GetInstitutionsQuery> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(Result, List<InstitutionDto>?)> Handle(GetInstitutionsQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var data = await _context.Institutions
                .Where(x => !x.IsDeleted)
                .Select(InstitutionSelectorExpression())
                .ToListAsync();

            return (Result.Success(), data);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return (Result.Failure(new List<string> { ex.Message }), null);
        }
    }

    private Expression<Func<Institution, InstitutionDto>> InstitutionSelectorExpression()
    {
        return e => new InstitutionDto
        {
            Id = e.Id,
            Name = e.Name,
            PublicSector = e.PublicSector,
            Type = e.Type
        };
    }
}
