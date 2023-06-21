using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.Regions.Commands.DeleteMunicipality;

namespace WebUI.Endpoints.Regions;

[OpenApiTag("Municipalities")]
[Authorize(Roles = $"{SecurityRoles.SuperAdmin}, {SecurityRoles.Admin}", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class DeleteMunicipality : EndpointBaseAsync.WithRequest<DeleteMunicipalityCommand>.WithActionResult<long>
{
    private readonly IMediator _mediator;

    public DeleteMunicipality(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpDelete("api/municipalities")]
    [OpenApiOperation(
            "Deletes a municipality",
            "Deletes a municipality from the system")
        ]
    public override async Task<ActionResult<long>> HandleAsync(DeleteMunicipalityCommand request, CancellationToken cancellationToken = default)
    {
        var result = await _mediator.Send(request, cancellationToken);
        if (result.Succeeded)
            return Ok(request.Id);

        return BadRequest(new ServerResponse(result.Errors));
    }
}
