using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;

namespace RegionalAnimalHealth.Application.Contracts.Diseases.Commands.DeleteDisease;
public class DeleteDiseaseCommand : IRequest<Result>
{
    public long Id { get; set; }
}

public class DeleteDiseaseCommandHandler : IRequestHandler<DeleteDiseaseCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<DeleteDiseaseCommand> _logger;

    public DeleteDiseaseCommandHandler(IApplicationDbContext context, ILogger<DeleteDiseaseCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<Result> Handle(DeleteDiseaseCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var entry = await _context.Diseases.FirstOrDefaultAsync(x => !x.IsDeleted && x.Id == request.Id);
            if (entry == null)
                return Result.Failure(new List<string> { "Disease not found." });

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
