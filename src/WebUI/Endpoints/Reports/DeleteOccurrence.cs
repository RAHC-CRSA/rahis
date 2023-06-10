using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.Reports.Commands.DeleteOccurrence;

namespace WebUI.Endpoints.Reports;

[OpenApiTag("Reports")]
[Authorize(Roles = $"{SecurityRoles.SuperAdmin}, {SecurityRoles.Admin}", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class DeleteOccurrence : EndpointBaseAsync.WithRequest<DeleteOccurrenceCommand>.WithActionResult<long>
{
    private readonly IMediator _mediator;

    public DeleteOccurrence(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpDelete("api/reports/occurrences")]
    [OpenApiOperation(
            "Deletes an occurrence",
            "Deletes an occurrence from the system")
        ]
    public override async Task<ActionResult<long>> HandleAsync(DeleteOccurrenceCommand request, CancellationToken cancellationToken = default)
    {
        var result = await _mediator.Send(request, cancellationToken);
        if (result.Succeeded)
            return Ok(request.Id);

        return BadRequest(new ServerResponse(result.Errors));
    }
}