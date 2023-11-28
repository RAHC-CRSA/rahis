using System.Net;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.Reports.Queries.GetPublicReports;
using RegionalAnimalHealth.Application.Contracts.Reports.Queries.GetReportsAnalytics;

namespace WebUI.Endpoints.Reports;


[OpenApiTag("Reports")]
public class GetPublicReports : EndpointBaseAsync.WithoutRequest.WithActionResult<List<PublicReportDto>>
{
    private readonly IMediator _mediator;

    public GetPublicReports(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("api/reports/public")]
    [OpenApiOperation(
            "Gets monthly reports",
            "Gets monthly reports in the system")
        ]
    [ProducesResponseType(typeof(List<PublicReportDto>), (int)HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType(typeof(string), (int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<List<PublicReportDto>>> HandleAsync(CancellationToken cancellationToken = default)
    {
        var (result, data) = await _mediator.Send(new GetPublicReportsQuery(), cancellationToken);
        if (result.Succeeded)
            return Ok(data);

        return BadRequest(new ServerResponse(result.Errors));
    }
}
