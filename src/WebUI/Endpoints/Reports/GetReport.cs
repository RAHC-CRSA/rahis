using System.Net;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models.Reports;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.Reports.Queries.GetOccurrences;
using RegionalAnimalHealth.Application.Contracts.Reports.Queries.GetReportById;
using RegionalAnimalHealth.Application.Contracts.Reports.Queries.GetReports;

namespace WebUI.Endpoints.Reports;

[OpenApiTag("Reports")]
public class GetReport : EndpointBaseAsync.WithRequest<GetReportByIdQuery>.WithActionResult<ReportDto>
{
    private readonly IMediator _mediator;

    public GetReport(IMediator mediator)
    {
        _mediator = mediator;
    }


    [Authorize(Roles = $"{SecurityRoles.SuperAdmin}, {SecurityRoles.Admin}, {SecurityRoles.Verifier}")]
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
        var data = await _mediator.Send(request, cancellationToken);
        return Ok(data);
    }
}
