using MediatR;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;

namespace RegionalAnimalHealth.Application.Contracts.Auth.Commands.UpdateProfile;
public class UpdateProfileCommand : IRequest<Result>
{
    public string Email { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
}

public class UpdateProfileCommandHandler : IRequestHandler<UpdateProfileCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IIdentityService _identityService;
    private readonly ICurrentUserService _currentUserService;
    private readonly ILogger<UpdateProfileCommand> _logger;

    public UpdateProfileCommandHandler(IApplicationDbContext context, IIdentityService identityService, ICurrentUserService currentUserService, ILogger<UpdateProfileCommand> logger)
    {
        _context = context;
        _identityService = identityService;
        _currentUserService = currentUserService;
        _logger = logger;
    }

    public async Task<Result> Handle(UpdateProfileCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var userId = _currentUserService.UserId;
            return await _identityService.UpdateUserProfileAsync(userId, request.Email, request.Password);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return Result.Failure(new List<string> { ex.Message });
        }
    }
}
