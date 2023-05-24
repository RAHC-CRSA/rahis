using MediatR;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Institutions;
using RegionalAnimalHealth.Domain.Entities.Personas;

namespace RegionalAnimalHealth.Application.Contracts.Institutions.Commands.AddParaProfessional;
public class AddParaProfessionalCommand : IRequest<(Result, ParaProfessionalDto?)>
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string Position { get; set; }
    public long? InstitutionId { get; set; }
}

public class AddParaProfessionalCommandHandler : IRequestHandler<AddParaProfessionalCommand, (Result, ParaProfessionalDto?)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<AddParaProfessionalCommand> _logger;

    public AddParaProfessionalCommandHandler(IApplicationDbContext context, ILogger<AddParaProfessionalCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(Result, ParaProfessionalDto?)> Handle(AddParaProfessionalCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var professional = ParaProfessional.Create(request.Name, request.Email, request.Phone, request.Position, request.InstitutionId);
            await _context.ParaProfessionals.AddAsync(professional);
            await _context.SaveChangesAsync(cancellationToken);

            var data = new ParaProfessionalDto
            {
                Id = professional.Id,
                Name = professional.Name,
                Email = professional.Email,
                Phone = professional.Phone,
                Position = professional.Position,
                //InstitutionId = professional.InstitutionId,
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
