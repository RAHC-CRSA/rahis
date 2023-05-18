using System.Net;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models.Reports;
using RegionalAnimalHealth.Application.Contracts.Diseases.Queries.GetDiseases;

namespace WebUI.Endpoints.Diseases;

[OpenApiTag("Diseases")]
public class GetDiseases : EndpointBaseAsync.WithoutRequest.WithActionResult<List<DiseaseDto>>
{
    private readonly IMediator _mediator;

    public GetDiseases(IMediator mediator)
    {
        _mediator = mediator;
    }

    [Authorize]
    [HttpGet("api/diseases")]
    [OpenApiOperation(
            "Gets the list of diseases",
            "Gets the list of diseases in the system")
        ]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType(typeof(string), (int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<List<DiseaseDto>>> HandleAsync(CancellationToken cancellationToken = default)
    {
        var data = await _mediator.Send(new GetDiseasesQuery());
        return Ok(data);
    }
}