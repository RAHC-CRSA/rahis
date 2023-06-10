using System.Net;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.Users.Commands.DeleteUser;

namespace WebUI.Endpoints.Users;

[OpenApiTag("Users")]
[Authorize(Roles = SecurityRoles.SuperAdmin, AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class DeleteUser : EndpointBaseAsync.WithRequest<DeleteUserCommand>.WithActionResult<string>
{
    private readonly IMediator _mediator;

    public DeleteUser(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpDelete("api/users")]
    [OpenApiOperation(
            "Deletes a user",
            "Deletes a user from the system")
        ]
    [ProducesResponseType(typeof(string), (int)HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType(typeof(string), (int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<string>> HandleAsync(DeleteUserCommand request, CancellationToken cancellationToken = default)
    {
        var result = await _mediator.Send(request, cancellationToken);
        if (result.Succeeded)
            return Ok(request.Id);

        return BadRequest(new ServerResponse(result.Errors));
    }
}
