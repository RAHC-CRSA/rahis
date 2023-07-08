using System.Net;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.NotificationRecipients.Commands.DeleteRecipient;

namespace WebUI.Endpoints.NotificationRecipients;

[OpenApiTag("Notification Recipients")]
[Authorize(Roles = $"{SecurityRoles.SuperAdmin}, {SecurityRoles.Admin}", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class DeleteRecipient : EndpointBaseAsync.WithRequest<DeleteRecipientCommand>.WithActionResult<string>
{
    private readonly IMediator _mediator;

    public DeleteRecipient(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpDelete("api/notification-recipients")]
    [OpenApiOperation(
            "Deletes a notification recipient",
            "Deletes a notification recipient from the system")
        ]
    [ProducesResponseType(typeof(string), (int)HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType(typeof(string), (int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<string>> HandleAsync(DeleteRecipientCommand request, CancellationToken cancellationToken = default)
    {
        var result = await _mediator.Send(request, cancellationToken);
        if (result.Succeeded)
            return Ok(request.Id);

        return BadRequest(new ServerResponse(result.Errors));
    }
}
