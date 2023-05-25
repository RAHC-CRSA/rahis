using System.Net;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Institutions;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.Institutions.Commands.AddParaProfessional;

namespace WebUI.Endpoints.Institutions;

[OpenApiTag("ParaProfessionals")]
[Authorize(Roles = $"{SecurityRoles.SuperAdmin}, {SecurityRoles.Admin}, {SecurityRoles.Reporter}", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class AddParaProfessional : EndpointBaseAsync.WithRequest<AddParaProfessionalCommand>.WithActionResult<ParaProfessionalDto>
{
    private readonly IMediator _mediator;

    public AddParaProfessional(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("api/para-professionals")]
    [OpenApiOperation(
            "Adds a para-professional",
            "Adds a para-professional to the system")
        ]
    [ProducesResponseType(typeof(ParaProfessionalDto), (int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(ServerResponse), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType((int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<ParaProfessionalDto>> HandleAsync(AddParaProfessionalCommand request, CancellationToken cancellationToken = default)
    {
        var (result, data) = await _mediator.Send(request);
        if (result.Succeeded)
            return Ok(data);

        return BadRequest(new ServerResponse(result.Errors));
    }
}
