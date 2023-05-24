using System.Net;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Reports;
using RegionalAnimalHealth.Application.Contracts.Reports.Queries.GetOccurrences;

namespace WebUI.Endpoints.Reports;

[OpenApiTag("Reports")]
public class GetOccurrences : EndpointBaseAsync.WithoutRequest.WithActionResult<List<OccurrenceDto>>
{
    private readonly IMediator _mediator;

    public GetOccurrences(IMediator mediator)
    {
        _mediator = mediator;
    }

    [Authorize]
    [HttpGet("api/reports/occurrences")]
    [OpenApiOperation(
            "Gets the list of occurrences",
            "Gets the list of occurrences in the system")
        ]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType(typeof(string), (int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<List<OccurrenceDto>>> HandleAsync(CancellationToken cancellationToken = default)
    {
        var (result, data) = await _mediator.Send(new GetOccurrencesQuery(), cancellationToken);
        if (result.Succeeded)
            return Ok(data);

        return BadRequest(new ErrorResponse(result.Errors));
    }
}
