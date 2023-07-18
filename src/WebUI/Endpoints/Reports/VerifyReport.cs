using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.Reports.Commands.VerifyReport;

namespace WebUI.Endpoints.Reports;

[OpenApiTag("Reports")]
[Authorize(Roles = SecurityRoles.Verifier, AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class VerifyReport : EndpointBaseAsync.WithRequest<VerifyReportCommand>.WithActionResult<long>
{
    private readonly IMediator _mediator;

    public VerifyReport(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("api/reports/verify")]
    [OpenApiOperation(
            "Verifies a report",
            "Verifies a report in the system")
        ]
    public override async Task<ActionResult<long>> HandleAsync(VerifyReportCommand request, CancellationToken cancellationToken = default)
    {
        var result = await _mediator.Send(request, cancellationToken);
        if (result.Succeeded)
            return Ok(request.Id);

        return BadRequest(new ServerResponse(result.Errors));
    }
}
