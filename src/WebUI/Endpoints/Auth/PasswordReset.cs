using System.Net;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Contracts.Auth.Commands.ResetPassword;

namespace WebUI.Endpoints.Auth;

[OpenApiTag("Auth")]
public class PasswordReset : EndpointBaseAsync.WithRequest<ResetPasswordCommand>.WithActionResult<ServerResponse>
{
    private readonly IMediator _mediator;

    public PasswordReset(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("api/auth/password-reset")]
    [OpenApiOperation(
        "Requests a user password reset",
        "Requests a user password reset")
    ]
    [ProducesResponseType(typeof(ServerResponse), (int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(ServerResponse), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType((int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<ServerResponse>> HandleAsync(ResetPasswordCommand request, CancellationToken cancellationToken = default)
    {
        var result = await _mediator.Send(request);
        if (result.Succeeded)
            return Ok(new ServerResponse("Password reset email sent.", false));

        return BadRequest(new ServerResponse(result.Errors));
    }
}