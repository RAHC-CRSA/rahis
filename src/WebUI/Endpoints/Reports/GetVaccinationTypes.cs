using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models.Reports;
using RegionalAnimalHealth.Application.Contracts.Reports.Queries.GetVaccinationTypes;
using System.Net;

namespace WebUI.Endpoints.Reports;

[OpenApiTag("Reports")]
public class GetVaccinationTypes : EndpointBaseAsync.WithoutRequest.WithActionResult<List<VaccinationTypeDto>>
{
    private readonly IMediator _mediator;

    public GetVaccinationTypes(IMediator mediator)
    {
        _mediator = mediator;
    }

    [Authorize]
    [HttpGet("api/reports/vaccination-types")]
    [OpenApiOperation(
            "Gets the list of vaccination types",
            "Gets the list of vaccination types in the system")
        ]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType(typeof(string), (int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<List<VaccinationTypeDto>>> HandleAsync(CancellationToken cancellationToken = default)
    {
        var data = await _mediator.Send(new GetVaccinationTypesQuery());
        return Ok(data);
    }
}
