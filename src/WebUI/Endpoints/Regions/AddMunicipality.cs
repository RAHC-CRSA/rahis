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
using RegionalAnimalHealth.Application.Contracts.Regions.Commands.AddMunicipality;

namespace WebUI.Endpoints.Regions;

[OpenApiTag("Municipalities")]
[Authorize(Roles = $"{SecurityRoles.SuperAdmin}, {SecurityRoles.Admin}", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class AddMunicipality : EndpointBaseAsync.WithRequest<AddMunicipalityCommand>.WithActionResult<MunicipalityDto>
{
    private readonly IMediator _mediator;

    public AddMunicipality(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("api/municipalities")]
    [OpenApiOperation(
            "Adds a municipality",
            "Adds a municipality to the system")
        ]
    [ProducesResponseType(typeof(MunicipalityDto), (int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(ServerResponse), (int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<MunicipalityDto>> HandleAsync(AddMunicipalityCommand request, CancellationToken cancellationToken = default)
    {
        var (result, data) = await _mediator.Send(request);
        if (result.Succeeded)
            return Ok(data);

        return BadRequest(new ServerResponse(result.Errors));
    }
}
