using System.Net;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.Reports.Queries.GetReports;

namespace WebUI.Endpoints.Reports;

[OpenApiTag("Reports")]
[Authorize(Roles = $"{SecurityRoles.SuperAdmin}, {SecurityRoles.Admin}, {SecurityRoles.Reporter}, {SecurityRoles.Verifier}, {SecurityRoles.ChiefVeterinaryOfficer}", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class GetReports : EndpointBaseAsync.WithRequest<GetReportsQuery>.WithActionResult<List<ReportListDto>>
{
    private readonly IMediator _mediator;

    public GetReports(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("api/reports")]
    [OpenApiOperation(
            "Gets the list of reports",
            "Gets the list of reports in the system")
        ]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType(typeof(string), (int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<List<ReportListDto>>> HandleAsync([FromQuery] GetReportsQuery request, CancellationToken cancellationToken = default)
    {
        var (result, data) = await _mediator.Send(request, cancellationToken);
        if (result.Succeeded)
            return Ok(data);

        return BadRequest(new ServerResponse(result.Errors));
    }
}
