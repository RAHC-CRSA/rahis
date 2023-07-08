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
using RegionalAnimalHealth.Application.Contracts.Regions.Queries.GetMunicipalities;
using RegionalAnimalHealth.Application.Contracts.Regions.Queries.GetRegions;

namespace WebUI.Endpoints.Regions;

[OpenApiTag("Municipalities")]
[Authorize(Roles = $"{SecurityRoles.SuperAdmin}, {SecurityRoles.Admin}, {SecurityRoles.Reporter}", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class GetMunicipalities : EndpointBaseAsync.WithRequest<long?>.WithActionResult<List<MunicipalityDto>>
{
    private readonly IMediator _mediator;

    public GetMunicipalities(IMediator mediator)
    {
        _mediator = mediator;
    }   

    [HttpGet("api/municipalities")]
    [OpenApiOperation(
            "Gets the list of municipalities",
            "Gets the list of municipalities in the system")
        ]
    [ProducesResponseType(typeof(List<MunicipalityDto>), (int)HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType(typeof(ServerResponse), (int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<List<MunicipalityDto>>> HandleAsync(long? regionId, CancellationToken cancellationToken = default)
    {
        var (result, data) = await _mediator.Send(new GetMunicipalitiesQuery { RegionId = regionId });
        if (result.Succeeded)
            return Ok(data);

        return BadRequest(new ServerResponse(result.Errors));
    }
}
