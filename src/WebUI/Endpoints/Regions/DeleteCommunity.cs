using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.Regions.Commands.DeleteCommunity;

namespace WebUI.Endpoints.Regions;

[OpenApiTag("Communities")]
[Authorize(Roles = $"{SecurityRoles.SuperAdmin}, {SecurityRoles.Admin}", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class DeleteCommunity : EndpointBaseAsync.WithRequest<DeleteCommunityCommand>.WithActionResult<long>
{
    private readonly IMediator _mediator;

    public DeleteCommunity(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpDelete("api/communities")]
    [OpenApiOperation(
            "Deletes a community",
            "Deletes a community from the system")
        ]
    public override async Task<ActionResult<long>> HandleAsync(DeleteCommunityCommand request, CancellationToken cancellationToken = default)
    {
        var result = await _mediator.Send(request, cancellationToken);
        if (result.Succeeded)
            return Ok(request.Id);

        return BadRequest(new ServerResponse(result.Errors));
    }
}
