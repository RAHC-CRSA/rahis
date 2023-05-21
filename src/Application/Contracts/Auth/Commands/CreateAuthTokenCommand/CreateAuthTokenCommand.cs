using MediatR;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Authorization;

namespace RegionalAnimalHealth.Application.Contracts.Auth.Commands.CreateAuthTokenCommand;

public class CreateAuthTokenCommand : IRequest<(Result, AuthResponseDto?)>
{
    public string Username { get; set; }
    public string Password { get; set; }
}

public class CreateAuthTokenCommandHandler
{
    private readonly IIdentityService _identityService;
    private readonly ILogger<CreateAuthTokenCommand> _logger;

    public CreateAuthTokenCommandHandler(IIdentityService identityService, ILogger<CreateAuthTokenCommand> logger)
    {
        _identityService = identityService;
        _logger = logger;
    }

    public async Task<(Result, AuthResponseDto?)> Handle(CreateAuthTokenCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var authResult = await _identityService.SignInAsync(request.Username, request.Password);
            if (!authResult.Succeeded)
                return (authResult, null);

            var authResponse = await _identityService.GetTokenAsync(request.Username);
            return (Result.Success(), authResponse);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return (Result.Failure(new List<string> { ex.Message }), null);
        }
    }
}
