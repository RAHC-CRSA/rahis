using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;

namespace RegionalAnimalHealth.Application.Contracts.Regions.Commands.DeleteDistrict;
public class DeleteDistrictCommand : IRequest<Result>
{
    public long Id { get; set; }
}

public class DeleteDistrictCommandHandler : IRequestHandler<DeleteDistrictCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<DeleteDistrictCommand> _logger;

    public DeleteDistrictCommandHandler(IApplicationDbContext context, ILogger<DeleteDistrictCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<Result> Handle(DeleteDistrictCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var entry = await _context.Districts.Where(x => !x.IsDeleted && x.Id == request.Id).FirstOrDefaultAsync();
            if (entry == null)
                return Result.Failure(new List<string> { "District not found." });

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
