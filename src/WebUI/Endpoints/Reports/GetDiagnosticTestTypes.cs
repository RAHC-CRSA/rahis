using System.Net;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models.Reports;
using RegionalAnimalHealth.Application.Contracts.Reports.Queries.GetDiagnosticTestTypes;

namespace WebUI.Endpoints.Reports;

[OpenApiTag("Reports")]
public class GetDiagnosticTestTypes : EndpointBaseAsync.WithoutRequest.WithActionResult<List<DiagnosticTestTypeDto>>
{
    private readonly IMediator _mediator;

    public GetDiagnosticTestTypes(IMediator mediator)
    {
        _mediator = mediator;
    }

    [Authorize]
    [HttpGet("api/reports/diagnostic-test-types")]
    [OpenApiOperation(
            "Gets the list of diagnostic test types",
            "Gets the list of diagnostic test types in the system")
        ]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType(typeof(string), (int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<List<DiagnosticTestTypeDto>>> HandleAsync(CancellationToken cancellationToken = default)
    {
        var data = await _mediator.Send(new GetDiagnosticTestTypesQuery());
        return Ok(data);
    }
}
