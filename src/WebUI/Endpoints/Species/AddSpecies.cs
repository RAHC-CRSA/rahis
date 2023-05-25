using System.Net;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models.Species;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.Species.Commands.AddSpecies;

namespace WebUI.Endpoints.Species;

[OpenApiTag("Species")]
[Authorize(Roles = $"{SecurityRoles.SuperAdmin}, {SecurityRoles.Admin}, {SecurityRoles.Reporter}", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class AddSpecies : EndpointBaseAsync.WithRequest<AddSpeciesCommand>.WithActionResult<SpeciesDto>
{
    private readonly IMediator _mediator;

    public AddSpecies(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("api/species")]
    [OpenApiOperation(
            "Adds a species",
            "Adds a species to the system")
        ]
    [ProducesResponseType(typeof(SpeciesDto), (int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(string), (int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<SpeciesDto>> HandleAsync(AddSpeciesCommand request, CancellationToken cancellationToken = default)
    {
        var (result, data) = await _mediator.Send(request);
        if (result.Succeeded)
            return Ok(data);

        return BadRequest(result.Errors.ToArray());
    }
}
