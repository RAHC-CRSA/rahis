using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.Regions.Commands.DeleteRegion;

namespace WebUI.Endpoints.Regions;

[OpenApiTag("Regions")]
[Authorize(Roles = $"{SecurityRoles.SuperAdmin}, {SecurityRoles.Admin}", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class DeleteRegion : EndpointBaseAsync.WithRequest<DeleteRegionCommand>.WithActionResult<long>
{
    private readonly IMediator _mediator;

    public DeleteRegion(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpDelete("api/regions")]
    [OpenApiOperation(
            "Deletes a region",
            "Deletes a region from the system")
        ]
    public override async Task<ActionResult<long>> HandleAsync(DeleteRegionCommand request, CancellationToken cancellationToken = default)
    {
        var result = await _mediator.Send(request, cancellationToken);
        if (result.Succeeded)
            return Ok(request.Id);

        return BadRequest(new ServerResponse(result.Errors));
    }
}
