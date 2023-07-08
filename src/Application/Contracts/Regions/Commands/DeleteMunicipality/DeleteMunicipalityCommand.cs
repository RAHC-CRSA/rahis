using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;

namespace RegionalAnimalHealth.Application.Contracts.Regions.Commands.DeleteMunicipality;
public class DeleteMunicipalityCommand : IRequest<Result>
{
    public long Id { get; set; }
}

public class DeleteMunicipalityCommandHandler : IRequestHandler<DeleteMunicipalityCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<DeleteMunicipalityCommand> _logger;

    public DeleteMunicipalityCommandHandler(IApplicationDbContext context, ILogger<DeleteMunicipalityCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<Result> Handle(DeleteMunicipalityCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var entry = await _context.Municipalities.Where(x => !x.IsDeleted && x.Id == request.Id).FirstOrDefaultAsync();
            if (entry == null)
                return Result.Failure(new List<string> { "Municipality not found." });

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