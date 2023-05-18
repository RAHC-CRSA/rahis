using System.Net;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models.Reports;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.Reports.Commands.AddDiagnosticTestType;

namespace WebUI.Endpoints.Reports;

[OpenApiTag("Reports")]
public class AddDiagnosticTestType : EndpointBaseAsync.WithRequest<AddDiagnosticTestTypeCommand>.WithActionResult<DiagnosticTestTypeDto>
{
    private readonly IMediator _mediator;

    public AddDiagnosticTestType(IMediator mediator)
    {
        _mediator = mediator;
    }

    [Authorize(Roles = SecurityRoles.Reporter)]
    [HttpPost("api/reports/add-diagnostic-test-type")]
    [OpenApiOperation(
            "Adds a diagnostic test type",
            "Adds a diagnostic test type to the system")
        ]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(string), (int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<DiagnosticTestTypeDto>> HandleAsync(AddDiagnosticTestTypeCommand request, CancellationToken cancellationToken = default)
    {
        var (result, data) = await _mediator.Send(request);
        if (result.Succeeded)
            return Ok(data);

        return BadRequest(result.Errors.ToArray());
    }
}
