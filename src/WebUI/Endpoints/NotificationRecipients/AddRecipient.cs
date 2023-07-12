using System.Net;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.NotificationRecipients;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.NotificationRecipients.Commands.AddRecipient;
using RegionalAnimalHealth.Application.Contracts.Users.Queries.GetUsers;

namespace WebUI.Endpoints.NotificationRecipients;

[Authorize(Roles = $"{SecurityRoles.SuperAdmin}, {SecurityRoles.Admin}", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
[OpenApiTag("Notification Recipients")]
public class AddRecipient : EndpointBaseAsync.WithRequest<AddRecipientCommand>.WithActionResult<UserListDto>
{
    private readonly IMediator _mediator;

    public AddRecipient(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("api/notification-recipients")]
    [OpenApiOperation(
            "Allows an admin to add a notification recipient",
            "Allows an admin to add a notification recipient to the system")
        ]
    [ProducesResponseType(typeof(NotificationRecipientDto), (int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(ServerResponse), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType((int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<UserListDto>> HandleAsync(AddRecipientCommand request, CancellationToken cancellationToken = default)
    {
        var (result, recipient) = await _mediator.Send(request, cancellationToken);
        if (result.Succeeded)
            return Ok(recipient);

        return BadRequest(new ServerResponse(result.Errors));
    }
}
