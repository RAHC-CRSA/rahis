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
using RegionalAnimalHealth.Application.Contracts.Reports.Commands.CreateReport;
using RegionalAnimalHealth.Application.Contracts.Reports.Commands.UpdateReport;

namespace WebUI.Endpoints.Reports;

[OpenApiTag("Reports")]
[Authorize(Roles = $"{SecurityRoles.SuperAdmin}, {SecurityRoles.Admin}, {SecurityRoles.Reporter}", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class UpdateReport : EndpointBaseAsync.WithRequest<UpdateReportCommand>.WithActionResult<ReportDto>
{
    private readonly IMediator _mediator;

    public UpdateReport(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPatch("api/reports")]
    [OpenApiOperation(
            "Updates a report",
            "Updates a new report")
        ]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(string), (int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<ReportDto>> HandleAsync(UpdateReportCommand request, CancellationToken cancellationToken = default)
    {
        var (result, report) = await _mediator.Send(request);
        if (result.Succeeded)
            return Ok(report);

        return BadRequest(new ServerResponse(result.Errors));
    }
}
