using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Institutions;

namespace RegionalAnimalHealth.Application.Contracts.Institutions.Commands.UpdateProfessional;
public class UpdateParaProfessionalCommand : IRequest<(Result, ParaProfessionalDto?)>
{
    public long ParaProfessionalId { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string Position { get; set; }
}

public class UpdateParaProfessionalCommandHandler : IRequestHandler<UpdateParaProfessionalCommand, (Result, ParaProfessionalDto?)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<UpdateParaProfessionalCommand> _logger;

    public UpdateParaProfessionalCommandHandler(IApplicationDbContext context, ILogger<UpdateParaProfessionalCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(Result, ParaProfessionalDto?)> Handle(UpdateParaProfessionalCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var professional = await _context.ParaProfessionals.Include(p => p.Institution).Where(X => !X.IsDeleted && X.Id == request.ParaProfessionalId).FirstOrDefaultAsync();
            if (professional == null)
            {
                return (Result.Failure(new List<string> { "Para professional not found." }), null);   
            }

            professional.Update(request.Phone, request.Email, request.Position);

            _context.ParaProfessionals.Update(professional);
            await _context.SaveChangesAsync(cancellationToken);

            var data = new ParaProfessionalDto
            {
                Id = professional.Id,
                Name = professional.Name,
                Phone = professional.Phone,
                Email = professional.Email,
                Position = professional.Position,
                InstitutionId = professional.InstitutionId,
                InstitutionName = professional.Institution?.Name
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
