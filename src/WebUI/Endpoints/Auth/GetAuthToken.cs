using System.Net;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models.Authorization;

namespace WebUI.Endpoints.Auth;

[OpenApiTag("Auth")]
public class GetAuthToken : EndpointBaseAsync.WithRequest<AuthRequestDto>.WithActionResult<AuthResponseDto>
{
    private readonly IIdentityService _identityService;
    private readonly IMediator _mediator;

    public GetAuthToken(IIdentityService identityService, IMediator mediator)
    {
        _identityService = identityService;
        _mediator = mediator;
    }

    [HttpPost("api/auth")]
    [OpenApiOperation(
        "Authenticates a user",
        "Authenticates a user and returns a json web token")
    ]
    [ProducesResponseType(typeof(AuthResponseDto), (int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(string[]), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType((int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<AuthResponseDto>> HandleAsync(AuthRequestDto request, CancellationToken cancellationToken = default)
    {
        var authResult = await _identityService.SignInAsync(request.Username, request.Password);
        if (!authResult.Succeeded)
            return BadRequest(authResult.Errors);

        var authResponse = await _identityService.GetTokenAsync(request.Username);
        return Ok(authResponse);
    }
}