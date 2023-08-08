using System.Net;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Authorization;
using RegionalAnimalHealth.Application.Contracts.Auth.Commands.CreateAuthToken;

namespace WebUI.Endpoints.Auth;

[OpenApiTag("Auth")]
public class GetAuthToken : EndpointBaseAsync.WithRequest<CreateAuthTokenCommand>.WithActionResult<AuthResponseDto>
{
    private readonly IMediator _mediator;

    public GetAuthToken(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("api/auth")]
    [OpenApiOperation(
        "Authenticates a user",
        "Authenticates a user and returns a json web token")
    ]
    [ProducesResponseType(typeof(AuthResponseDto), (int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(ServerResponse), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType((int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<AuthResponseDto>> HandleAsync(CreateAuthTokenCommand request, CancellationToken cancellationToken = default)
    {
        var (result, authResponse) = await _mediator.Send(request);
        if (result.Succeeded)
            return Ok(authResponse);

        return BadRequest(new ServerResponse(result.Errors));
    }
}