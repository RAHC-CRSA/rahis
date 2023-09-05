using System.Net;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Contracts.Auth.Commands.UpdateProfile;

namespace WebUI.Endpoints.Auth;

[OpenApiTag("Auth")]
public class UpdateUserProfile : EndpointBaseAsync.WithRequest<UpdateProfileCommand>.WithActionResult<ServerResponse>
{
    private readonly IMediator _mediator;

    public UpdateUserProfile(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("api/auth/update-profile")]
    [OpenApiOperation(
        "Updates a user's profile",
        "Updates a user's profile")
    ]
    [ProducesResponseType(typeof(ServerResponse), (int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(ServerResponse), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType((int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<ServerResponse>> HandleAsync(UpdateProfileCommand request, CancellationToken cancellationToken = default)
    {
        var result = await _mediator.Send(request);
        if (result.Succeeded)
            return Ok(new ServerResponse("Profile has been updated successfully.", false));

        return BadRequest(new ServerResponse(result.Errors));
    }
}