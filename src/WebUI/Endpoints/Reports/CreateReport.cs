﻿using System.Net;
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

namespace WebUI.Endpoints.Reports;

[OpenApiTag("Reports")]
[Authorize(Roles = $"{SecurityRoles.SuperAdmin}, {SecurityRoles.Admin}, {SecurityRoles.Reporter}", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class CreateReport : EndpointBaseAsync.WithRequest<CreateReportCommand>.WithActionResult<ReportDto>
{
    private readonly IMediator _mediator;

    public CreateReport(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("api/reports")]
    [OpenApiOperation(
            "Creates a report",
            "Creates a new report")
        ]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(string), (int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<ReportDto>> HandleAsync(CreateReportCommand request, CancellationToken cancellationToken = default)
    {
        var (result, report) = await _mediator.Send(request);
        if (result.Succeeded)
            return Ok(report);

        return BadRequest(new ServerResponse(result.Errors));
    }
}
