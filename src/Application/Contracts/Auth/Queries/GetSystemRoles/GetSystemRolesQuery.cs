using MediatR;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;

namespace RegionalAnimalHealth.Application.Contracts.Auth.Queries.GetSystemRoles;
public class GetSystemRolesQuery : IRequest<(Result, List<string>?)>
{
}

public class GetSystemRolesQueryHandler : IRequestHandler<GetSystemRolesQuery, (Result, List<string>?)>
{
    private readonly IIdentityService _identityService;
    private readonly ILogger<GetSystemRolesQuery> _logger;

    public GetSystemRolesQueryHandler(IIdentityService identityService, ILogger<GetSystemRolesQuery> logger)
    {
        _identityService = identityService;
        _logger = logger;
    }

    public async Task<(Result, List<string>?)> Handle(GetSystemRolesQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var roles = await _identityService.GetAvailableRolesAsync();
            return (Result.Success(),  roles);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return (Result.Failure(new List<string> { ex.Message }), null);
        }
    }
}
