using System.Net;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Reports;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.Reports.Queries.GetReportById;

namespace WebUI.Endpoints.Reports;

[OpenApiTag("Reports")]
[Authorize(Roles = $"{SecurityRoles.SuperAdmin}, {SecurityRoles.Admin}, {SecurityRoles.Reporter}, {SecurityRoles.Verifier}", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class GetReport : EndpointBaseAsync.WithRequest<GetReportByIdQuery>.WithActionResult<ReportDto>
{
    private readonly IMediator _mediator;

    public GetReport(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("api/report/{ReportId}")]
    [OpenApiOperation(
            "Gets a report by id",
            "Gets a report by id")
        ]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType(typeof(string), (int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<ReportDto>> HandleAsync([FromRoute] GetReportByIdQuery request, CancellationToken cancellationToken = default)
    {
        var (result, data) = await _mediator.Send(request, cancellationToken);
        if (result.Succeeded)
            return Ok(data);

        return BadRequest(new ServerResponse(result.Errors));
    }
}
