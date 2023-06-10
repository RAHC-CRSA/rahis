using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.Reports.Commands.DeleteReport;

namespace WebUI.Endpoints.Reports;

[OpenApiTag("Reports")]
[Authorize(Roles = $"{SecurityRoles.SuperAdmin}, {SecurityRoles.Admin}", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class DeleteReport : EndpointBaseAsync.WithRequest<DeleteReportCommand>.WithActionResult<long>
{
    private readonly IMediator _mediator;

    public DeleteReport(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpDelete("api/reports")]
    [OpenApiOperation(
            "Deletes a report",
            "Deletes a report from the system")
        ]
    public override async Task<ActionResult<long>> HandleAsync(DeleteReportCommand request, CancellationToken cancellationToken = default)
    {
        var result = await _mediator.Send(request, cancellationToken);
        if (result.Succeeded)
            return Ok(request.Id);

        return BadRequest(new ServerResponse(result.Errors));
    }
}
