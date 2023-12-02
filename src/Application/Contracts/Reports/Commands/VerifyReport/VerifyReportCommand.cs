using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Domain.Enums;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Commands.VerifyReport;
public class VerifyReportCommand : IRequest<Result>
{
    public long Id { get; set; }
    public string? CvoComment { get; set; }
    public ReportStatus ReportStatus { get; set; }
}

public class VerifyReportCommandHandler : IRequestHandler<VerifyReportCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<VerifyReportCommand> _logger;

    public VerifyReportCommandHandler(IApplicationDbContext context, ILogger<VerifyReportCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<Result> Handle(VerifyReportCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var report = await _context.Reports.Where(x => !x.IsDeleted && x.Id == request.Id).FirstOrDefaultAsync();
            if (report == null)
                return Result.Failure(new List<string> { "Report not found." });

            report.Verify(request.CvoComment, request.ReportStatus);
            _context.Reports.Update(report);
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
