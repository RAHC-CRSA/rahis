using System.Net;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Reports;
using RegionalAnimalHealth.Application.Contracts.Reports.Queries.GetControlMeasures;

namespace WebUI.Endpoints.Reports;

[OpenApiTag("Control Measures")]
[Authorize]
public class GetControlMeasures : EndpointBaseAsync.WithoutRequest.WithActionResult<List<ControlMeasureDto>>
{
    private readonly IMediator _mediator;

    public GetControlMeasures(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("api/control-measures")]
    [OpenApiOperation(
            "Gets the list of control measures",
            "Gets the list of control measures in the system")
        ]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType(typeof(string), (int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<List<ControlMeasureDto>>> HandleAsync(CancellationToken cancellationToken = default)
    {
        var (result, data) = await _mediator.Send(new GetControlMeasuresQuery(), cancellationToken);
        if (result.Succeeded)
            return Ok(data);

        return BadRequest(new ServerResponse(result.Errors));
    }
}
