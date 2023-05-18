using System.Net;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models.Regions;
using RegionalAnimalHealth.Application.Contracts.Regions.Queries.GetCountries;
using Swashbuckle.AspNetCore.Annotations;

namespace WebUI.Endpoints.Regions;

[OpenApiTag("Countries")]
public class GetCountries : EndpointBaseAsync.WithoutRequest.WithActionResult<List<CountryDto>>
{
    private readonly IMediator _mediator;

    public GetCountries(IMediator mediator)
    {
        _mediator = mediator;
    }

    [Authorize]
    [HttpGet("api/countries")]
    [OpenApiOperation(
            "Gets the list of countries",
            "Gets the list of countries in the system")
        ]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType(typeof(string), (int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<List<CountryDto>>> HandleAsync(CancellationToken cancellationToken = default)
    {
        var data = await _mediator.Send(new GetCountriesQuery());
        return Ok(data);
    }
}
