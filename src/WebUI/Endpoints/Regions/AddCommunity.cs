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
using RegionalAnimalHealth.Application.Contracts.Regions.Commands.AddCommunity;

namespace WebUI.Endpoints.Regions;

[OpenApiTag("Communities")]
[Authorize(Roles = $"{SecurityRoles.SuperAdmin}, {SecurityRoles.Admin}", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class AddCommunity : EndpointBaseAsync.WithRequest<AddCommunityCommand>.WithActionResult<CommunityDto>
{
    private readonly IMediator _mediator;

    public AddCommunity(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("api/communities")]
    [OpenApiOperation(
            "Adds a community",
            "Adds a community to the system")
        ]
    [ProducesResponseType(typeof(CommunityDto), (int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(ServerResponse), (int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<CommunityDto>> HandleAsync(AddCommunityCommand request, CancellationToken cancellationToken = default)
    {
        var (result, data) = await _mediator.Send(request);
        if (result.Succeeded)
            return Ok(data);

        return BadRequest(new ServerResponse(result.Errors));
    }
}
