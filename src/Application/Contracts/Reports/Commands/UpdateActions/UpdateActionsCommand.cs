using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Commands.UpdateActions;
public class UpdateActionsCommand : IRequest<Result>
{
    public long ReportId { get; set; }
    public bool DestructionOfCorpses { get; set; }
    public bool Disinfection { get; set; }
    public bool Observation { get; set; }
    public bool Quarantine { get; set; }
    public bool MovementControl { get; set; }
    public bool Treatment { get; set; }
    public string? TreatmentDetails { get; set; }
}

public class UpdateActionsCommandHandler : IRequestHandler<UpdateActionsCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<UpdateActionsCommand> _logger;

    public UpdateActionsCommandHandler(IApplicationDbContext context, ILogger<UpdateActionsCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<Result> Handle(UpdateActionsCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var report = await _context.Reports.Where(x => !x.IsDeleted && x.Id == request.ReportId).FirstOrDefaultAsync();

            if (report == null)
            {
                var message = "Specified report id was not found.";
                _logger.LogDebug(message, request.ReportId);
                return Result.Failure(new List<string> { message });
            }

            report.UpdateActions(request.DestructionOfCorpses, request.Disinfection, request.Observation, request.Quarantine, request.MovementControl, request.Treatment, request.TreatmentDetails);
            await _context.SaveChangesAsync(cancellationToken);

            return Result.Success();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message, request);
            return Result.Failure(new List<string> { ex.Message });
        }


    }
}
