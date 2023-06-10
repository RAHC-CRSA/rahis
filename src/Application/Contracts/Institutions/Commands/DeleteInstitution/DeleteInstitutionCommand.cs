using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;

namespace RegionalAnimalHealth.Application.Contracts.Institutions.Commands.DeleteInstitution;
public class DeleteInstitutionCommand : IRequest<Result>
{
    public long Id { get; set; }
}

public class DeleteInstitutionCommandHandler : IRequestHandler<DeleteInstitutionCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<DeleteInstitutionCommand> _logger;

    public DeleteInstitutionCommandHandler(IApplicationDbContext context, ILogger<DeleteInstitutionCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<Result> Handle(DeleteInstitutionCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var entry = await _context.Institutions.FirstOrDefaultAsync(x => !x.IsDeleted && x.Id == request.Id);
            if (entry == null)
                return Result.Failure(new List<string> { "Institution not found." });

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
