using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.Reports.Commands.SendNotification;

namespace WebUI.Endpoints.Reports;

[OpenApiTag("Reports")]
[Authorize(Roles = SecurityRoles.Verifier, AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class SendNotification: EndpointBaseAsync.WithRequest<SendNotificationCommand>.WithActionResult<ServerResponse>
{
    private readonly IMediator _mediator;

    public SendNotification(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("api/reports/send-notification")]
    [OpenApiOperation(
            "Sends a notification",
            "Sends a notification for a report in the system")
        ]
    public override async Task<ActionResult<ServerResponse>> HandleAsync(SendNotificationCommand request, CancellationToken cancellationToken = default)
    {
        var result = await _mediator.Send(request, cancellationToken);
        if (result.Succeeded)
            return Ok(new ServerResponse("Report sent successfully", false));

        return BadRequest(new ServerResponse(result.Errors));
    }
}
