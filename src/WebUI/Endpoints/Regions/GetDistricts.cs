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
using RegionalAnimalHealth.Application.Contracts.Regions.Queries.GetDistricts;
using RegionalAnimalHealth.Application.Contracts.Regions.Queries.GetRegions;

namespace WebUI.Endpoints.Regions;

[OpenApiTag("Districts")]
[Authorize(Roles = $"{SecurityRoles.SuperAdmin}, {SecurityRoles.Admin}, {SecurityRoles.Reporter}", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class GetDistricts : EndpointBaseAsync.WithRequest<long?>.WithActionResult<List<DistrictDto>>
{
    private readonly IMediator _mediator;

    public GetDistricts(IMediator mediator)
    {
        _mediator = mediator;
    }   

    [HttpGet("api/districts")]
    [OpenApiOperation(
            "Gets the list of districts",
            "Gets the list of districts in the system")
        ]
    [ProducesResponseType(typeof(List<DistrictDto>), (int)HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType(typeof(ServerResponse), (int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<List<DistrictDto>>> HandleAsync(long? municipalityId, CancellationToken cancellationToken = default)
    {
        var (result, data) = await _mediator.Send(new GetDistrictsQuery { MunicipalityId = municipalityId });
        if (result.Succeeded)
            return Ok(data);

        return BadRequest(new ServerResponse(result.Errors));
    }
}
