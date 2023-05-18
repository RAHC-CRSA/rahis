using MediatR;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Personas;

namespace RegionalAnimalHealth.Application.Contracts.Users.Queries.GetUser;
public class GetUserQuery : IRequest<(Result, UserDto?)>
{
    public string UserId { get; set; }
}

public class GetUserQueryHandler : IRequestHandler<GetUserQuery, (Result, UserDto?)>
{
    private readonly IIdentityService _identityService;

    public GetUserQueryHandler(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    public async Task<(Result, UserDto?)> Handle(GetUserQuery request, CancellationToken cancellationToken)
    {
        var (result, user) = await _identityService.GetUserAsync(request.UserId);

        if (!result.Succeeded)
        {
            return (result, null);
        }

        return (result, user);
    }
}
