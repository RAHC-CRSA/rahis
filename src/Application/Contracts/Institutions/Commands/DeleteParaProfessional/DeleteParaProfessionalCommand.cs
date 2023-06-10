using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;

namespace RegionalAnimalHealth.Application.Contracts.Institutions.Commands.DeleteParaProfessional;
public class DeleteParaProfessionalCommand : IRequest<Result>
{
    public long Id { get; set; }
}

public class DeleteParaProfessionalCommandHandler : IRequestHandler<DeleteParaProfessionalCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<DeleteParaProfessionalCommand> _logger;

    public DeleteParaProfessionalCommandHandler(IApplicationDbContext context, ILogger<DeleteParaProfessionalCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<Result> Handle(DeleteParaProfessionalCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var entry = await _context.ParaProfessionals.FirstOrDefaultAsync(x => !x.IsDeleted && x.Id == request.Id);
            if (entry == null)
                return Result.Failure(new List<string> { "ParaProfessional not found." });

            entry.Delete();
            await _context.SaveChangesAsync(cancellationToken);

            return Result.Success();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return Result.Failure(new List<string> { ex.Message });
        }
    }
}
