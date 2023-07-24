using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Institutions;

namespace RegionalAnimalHealth.Application.Contracts.Institutions.Commands.UpdateInstitution;
public class UpdateInstitutionCommand : IRequest<(Result, InstitutionDto?)>
{
    public long InstitutionId { get; set; }
    public string Name { get; set; }
    public bool PublicSector { get; set; }
    public string? Type { get; set; }
}

public class UpdateInstitutionCommandHandler : IRequestHandler<UpdateInstitutionCommand, (Result, InstitutionDto?)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<UpdateInstitutionCommand> _logger;

    public UpdateInstitutionCommandHandler(IApplicationDbContext context, ILogger<UpdateInstitutionCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(Result, InstitutionDto?)> Handle(UpdateInstitutionCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var institution = await _context.Institutions.Where(x => !x.IsDeleted && x.Id == request.InstitutionId).FirstOrDefaultAsync();

            if (institution == null)
            {
                return (Result.Failure(new List<string> { "Institution not found" }), null);
            }

            institution.Update(request.Name, request.Type, request.PublicSector);

            _context.Institutions.Update(institution);
            await _context.SaveChangesAsync(cancellationToken);

            var data = new InstitutionDto
            {
                Id = institution.Id,
                Name = institution.Name,
                Type = institution.Type,
                PublicSector = institution.PublicSector,
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
