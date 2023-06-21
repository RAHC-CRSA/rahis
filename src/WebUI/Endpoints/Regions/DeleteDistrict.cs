using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.Regions.Commands.DeleteDistrict;

namespace WebUI.Endpoints.Regions;

[OpenApiTag("Districts")]
[Authorize(Roles = $"{SecurityRoles.SuperAdmin}, {SecurityRoles.Admin}", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class DeleteDistrict : EndpointBaseAsync.WithRequest<DeleteDistrictCommand>.WithActionResult<long>
{
    private readonly IMediator _mediator;

    public DeleteDistrict(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpDelete("api/districts")]
    [OpenApiOperation(
            "Deletes a district",
            "Deletes a district from the system")
        ]
    public override async Task<ActionResult<long>> HandleAsync(DeleteDistrictCommand request, CancellationToken cancellationToken = default)
    {
        var result = await _mediator.Send(request, cancellationToken);
        if (result.Succeeded)
            return Ok(request.Id);

        return BadRequest(new ServerResponse(result.Errors));
    }
}
