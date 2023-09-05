using System.Net;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.Reports.Queries.GetReportsAnalytics;

namespace WebUI.Endpoints.Reports;


[OpenApiTag("Reports")]
[Authorize(Roles = $"{SecurityRoles.SuperAdmin}, {SecurityRoles.Admin}, {SecurityRoles.Reporter}, {SecurityRoles.RahOfficer}, {SecurityRoles.ChiefVeterinaryOfficer}", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class GetReportsAnalytics : EndpointBaseAsync.WithRequest<GetReportsAnalyticsQuery>.WithActionResult<ReportsAnalyticsDto>
{
    private readonly IMediator _mediator;

    public GetReportsAnalytics(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("api/reports/analytics")]
    [OpenApiOperation(
            "Gets analytics data for reports",
            "Gets analytics data for reports in the system")
        ]
    [ProducesResponseType(typeof(ReportsAnalyticsDto), (int)HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType(typeof(string), (int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<ReportsAnalyticsDto>> HandleAsync([FromQuery] GetReportsAnalyticsQuery request, CancellationToken cancellationToken = default)
    {
        var (result, data) = await _mediator.Send(request, cancellationToken);
        if (result.Succeeded)
            return Ok(data);

        return BadRequest(new ServerResponse(result.Errors));
    }
}
