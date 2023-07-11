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
using RegionalAnimalHealth.Application.Contracts.NotificationRecipients.Queries.GetRecipients;

namespace WebUI.Endpoints.NotificationRecipients;

[OpenApiTag("Notification Recipients")]
[Authorize(Roles = $"{SecurityRoles.SuperAdmin}, {SecurityRoles.Admin}", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class GetRecipients : EndpointBaseAsync.WithoutRequest.WithActionResult<List<NotificationRecipientDto>>
{
    private readonly IMediator _mediator;

    public GetRecipients(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("api/notification-recipients")]
    [OpenApiOperation(
            "Gets the list of notification recipients",
            "Gets the list of notification recipients in the system")
        ]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType(typeof(string), (int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<List<NotificationRecipientDto>>> HandleAsync(CancellationToken cancellationToken = default)
    {
        var (result, data) = await _mediator.Send(new GetRecipientsQuery());
        if (result.Succeeded)
            return Ok(data);

        return BadRequest(new ServerResponse(result.Errors));
    }
}
