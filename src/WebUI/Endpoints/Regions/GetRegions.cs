using System.Net;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Regions;
using RegionalAnimalHealth.Application.Contracts.Regions.Queries.GetRegions;

namespace WebUI.Endpoints.Regions;

[OpenApiTag("Regions")]
public class GetRegions : EndpointBaseAsync.WithRequest<long?>.WithActionResult<List<RegionDto>>
{
    private readonly IMediator _mediator;

    public GetRegions(IMediator mediator)
    {
        _mediator = mediator;
    }   

    [Authorize]
    [HttpGet("api/regions")]
    [OpenApiOperation(
            "Gets the list of regions",
            "Gets the list of regions in the system")
        ]
    [ProducesResponseType(typeof(List<RegionDto>), (int)HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType(typeof(string), (int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<List<RegionDto>>> HandleAsync(long? countryId, CancellationToken cancellationToken = default)
    {
        var (result, data) = await _mediator.Send(new GetRegionsQuery { CountryId = countryId });
        if (result.Succeeded)
            return Ok(data);

        return BadRequest(new ErrorResponse(result.Errors));
    }
}
