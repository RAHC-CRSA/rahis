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
using RegionalAnimalHealth.Application.Contracts.Regions.Queries.GetCommunities;

namespace WebUI.Endpoints.Regions;

[OpenApiTag("Communities")]
[Authorize(Roles = $"{SecurityRoles.SuperAdmin}, {SecurityRoles.Admin}, {SecurityRoles.Reporter}", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class GetCommunities : EndpointBaseAsync.WithRequest<long?>.WithActionResult<List<CommunityDto>>
{
    private readonly IMediator _mediator;

    public GetCommunities(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("api/communities")]
    [OpenApiOperation(
            "Gets the list of communities",
            "Gets the list of communities in the system")
        ]
    [ProducesResponseType(typeof(List<CommunityDto>), (int)HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType(typeof(ServerResponse), (int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<List<CommunityDto>>> HandleAsync(long? districtId, CancellationToken cancellationToken = default)
    {
        var (result, data) = await _mediator.Send(new GetCommunitiesQuery { DistrictId = districtId });
        if (result.Succeeded)
            return Ok(data);

        return BadRequest(new ServerResponse(result.Errors));
    }
}
