﻿using MediatR;
using Microsoft.Extensions.Logging;
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
    private readonly ILogger<GetUserQuery> _logger;

    public GetUserQueryHandler(IIdentityService identityService, ILogger<GetUserQuery> logger)
    {
        _identityService = identityService;
        _logger = logger;
    }

    public async Task<(Result, UserDto?)> Handle(GetUserQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var (result, user) = await _identityService.GetUserAsync(request.UserId);

            if (!result.Succeeded)
            {
                return (result, null);
            }

            return (result, user);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return (Result.Failure(new List<string> { ex.Message }), null);
        }
    }
}
