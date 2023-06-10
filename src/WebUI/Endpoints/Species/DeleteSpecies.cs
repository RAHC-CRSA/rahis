using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.Species.Commands.DeleteSpecies;

namespace WebUI.Endpoints.Species;

[OpenApiTag("Species")]
[Authorize(Roles = $"{SecurityRoles.SuperAdmin}, {SecurityRoles.Admin}", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class DeleteSpecies : EndpointBaseAsync.WithRequest<DeleteSpeciesCommand>.WithActionResult<long>
{
    private readonly IMediator _mediator;

    public DeleteSpecies(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpDelete("api/species")]
    [OpenApiOperation(
            "Deletes a species",
            "Deletes a species from the system")
        ]
    public override async Task<ActionResult<long>> HandleAsync(DeleteSpeciesCommand request, CancellationToken cancellationToken = default)
    {
        var result = await _mediator.Send(request, cancellationToken);
        if (result.Succeeded)
            return Ok(request.Id);

        return BadRequest(new ServerResponse(result.Errors));
    }
}
