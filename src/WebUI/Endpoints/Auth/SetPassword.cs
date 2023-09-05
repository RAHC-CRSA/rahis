using System.Net;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Contracts.Auth.Commands.SetPassword;

namespace WebUI.Endpoints.Auth;

[OpenApiTag("Auth")]
public class SetPassword : EndpointBaseAsync.WithRequest<SetPasswordCommand>.WithActionResult<ServerResponse>
{
    private readonly IMediator _mediator;

    public SetPassword(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("api/auth/set-password")]
    [OpenApiOperation(
        "Sets a new user password",
        "Sets a new user password")
    ]
    [ProducesResponseType(typeof(ServerResponse), (int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(ServerResponse), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType((int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<ServerResponse>> HandleAsync(SetPasswordCommand request, CancellationToken cancellationToken = default)
    {
        var result = await _mediator.Send(request);
        if (result.Succeeded)
            return Ok(new ServerResponse("Password reset link has been sent to the associated email address.", false));

        return BadRequest(new ServerResponse(result.Errors));
    }
}