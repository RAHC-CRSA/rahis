using MediatR;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;

namespace RegionalAnimalHealth.Application.Contracts.Auth.Commands.SetPassword;
public class SetPasswordCommand : IRequest<Result>
{
    public string ResetToken { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}

public class SetPasswordCommandHandler : IRequestHandler<SetPasswordCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IIdentityService _identityService;
    private readonly ILogger<SetPasswordCommand> _logger;

    public SetPasswordCommandHandler(IApplicationDbContext context, IIdentityService identityService, ILogger<SetPasswordCommand> logger)
    {
        _context = context;
        _identityService = identityService;
        _logger = logger;
    }

    public async Task<Result> Handle(SetPasswordCommand request, CancellationToken cancellationToken)
    {
        try
        {
            return await _identityService.UpdatePasswordAsync(request.Email, request.Password, request.ResetToken);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return Result.Failure(new List<string> { ex.Message });
        }
    }
}
