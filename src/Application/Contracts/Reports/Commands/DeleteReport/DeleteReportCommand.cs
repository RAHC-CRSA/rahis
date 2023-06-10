using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Commands.DeleteReport;
public class DeleteReportCommand : IRequest<Result>
{
    public long Id { get; set; }
}

public class DeleteReportCommandHandler : IRequestHandler<DeleteReportCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<DeleteReportCommand> _logger;

    public DeleteReportCommandHandler(IApplicationDbContext context, ILogger<DeleteReportCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<Result> Handle(DeleteReportCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var entry = await _context.Reports.FirstOrDefaultAsync(x => !x.IsDeleted && x.Id == request.Id);
            if (entry == null)
                return Result.Failure(new List<string> { "Report not found." });

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
