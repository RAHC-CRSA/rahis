using System.Net;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Regions;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.Regions.Queries.GetRegions;

namespace WebUI.Endpoints.Regions;

[OpenApiTag("Regions")]
[Authorize(Roles = $"{SecurityRoles.SuperAdmin}, {SecurityRoles.Admin}, {SecurityRoles.Reporter}", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class GetRegions : EndpointBaseAsync.WithRequest<long?>.WithActionResult<List<RegionDto>>
{
    private readonly IMediator _mediator;

    public GetRegions(IMediator mediator)
    {
        _mediator = mediator;
    }   

    [HttpGet("api/regions")]
    [OpenApiOperation(
            "Gets the list of regions",
            "Gets the list of regions in the system")
        ]
    [ProducesResponseType(typeof(List<RegionDto>), (int)HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType(typeof(ServerResponse), (int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<List<RegionDto>>> HandleAsync(long? countryId, CancellationToken cancellationToken = default)
    {
        var (result, data) = await _mediator.Send(new GetRegionsQuery { CountryId = countryId });
        if (result.Succeeded)
            return Ok(data);

        return BadRequest(new ServerResponse(result.Errors));
    }
}
