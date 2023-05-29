using MediatR;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Institutions;
using RegionalAnimalHealth.Domain.Entities.Personas;

namespace RegionalAnimalHealth.Application.Contracts.Institutions.Commands.AddInstitution;
public class AddInstitutionCommand : IRequest<(Result, InstitutionDto?)>
{
    public string Name { get; set; }
    public bool PublicSector { get; set; }
    public string? Type { get; set; }
}

public class AddInstitutionCommandHandler : IRequestHandler<AddInstitutionCommand, (Result, InstitutionDto?)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<AddInstitutionCommand> _logger;

    public AddInstitutionCommandHandler(IApplicationDbContext context, ILogger<AddInstitutionCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(Result, InstitutionDto?)> Handle(AddInstitutionCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var institution = Institution.Create(request.Name, request.PublicSector, request.Type);
            await _context.Institutions.AddAsync(institution);
            await _context.SaveChangesAsync(cancellationToken);

            var data = new InstitutionDto
            {
                Id = institution.Id,
                Name = institution.Name,
                PublicSector = institution.PublicSector,
                Type = institution.Type,
            };

            return (Result.Success(), data);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return (Result.Failure(new List<string> { ex.Message }), null);
        }
    }
}
