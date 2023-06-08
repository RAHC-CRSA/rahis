using System.Linq.Expressions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Institutions;
using RegionalAnimalHealth.Domain.Entities.Personas;

namespace RegionalAnimalHealth.Application.Contracts.Institutions.Queries.GetParaProfessionals;
public class GetParaProfessionalsQuery : IRequest<(Result, List<ParaProfessionalDto>?)>
{
    public long? InstitutionId { get; set; }
}

public class GetParaProfessionalsQueryHandler : IRequestHandler<GetParaProfessionalsQuery, (Result, List<ParaProfessionalDto>?)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<GetParaProfessionalsQuery> _logger;

    public GetParaProfessionalsQueryHandler(IApplicationDbContext context, ILogger<GetParaProfessionalsQuery> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(Result, List<ParaProfessionalDto>?)> Handle(GetParaProfessionalsQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var data = await _context.ParaProfessionals
                .Include(e => e.Institution)
                .Where(x => !x.IsDeleted && (request.InstitutionId != null ? x.InstitutionId == request.InstitutionId : true))
                .Where(x => !x.IsDeleted)
                .Select(ParaProfessionalSelectorExpression())
                .ToListAsync();

            return (Result.Success(), data);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return (Result.Failure(new List<string> { ex.Message }), null);
        }
    }

    private Expression<Func<ParaProfessional, ParaProfessionalDto>> ParaProfessionalSelectorExpression()
    {
        return e => new ParaProfessionalDto
        {
            Id = e.Id,
            Name = e.Name,
            Position = e.Position,
            Email = e.Email,
            Phone = e.Phone,
            InstitutionId = e.InstitutionId,
            InstitutionName = e.Institution.Name ?? null
        };
    }
}
