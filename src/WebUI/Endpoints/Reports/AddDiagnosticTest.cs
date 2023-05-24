using System.Net;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.Reports.Commands.AddDiagnosticTest;

namespace WebUI.Endpoints.Reports;

[OpenApiTag("Reports")]
public class AddDiagnosticTest : EndpointBaseAsync.WithRequest<AddDiagnosticTestCommand>.WithActionResult
{
    private readonly IMediator _mediator;

    public AddDiagnosticTest(IMediator mediator)
    {
        _mediator = mediator;
    }

    [Authorize(Roles = SecurityRoles.Reporter)]
    [HttpPost("api/reports/add-diagnostic-test")]
    [OpenApiOperation(
            "Adds a diagnostic test record to a report",
            "Adds a diagnostic test record to a report")
        ]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(ErrorResponse), (int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult> HandleAsync(AddDiagnosticTestCommand request, CancellationToken cancellationToken = default)
    {
        var (result, data) = await _mediator.Send(request, cancellationToken);
        if (result.Succeeded)
            return Ok(data);

        return BadRequest(new ErrorResponse(result.Errors));
    }
}
