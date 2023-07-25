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
using RegionalAnimalHealth.Application.Contracts.Institutions.Commands.UpdateProfessional;

namespace WebUI.Endpoints.Institutions;

[OpenApiTag("ParaProfessionals")]
[Authorize(Roles = $"{SecurityRoles.SuperAdmin}, {SecurityRoles.Admin}", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class UpdateParaProfessional : EndpointBaseAsync.WithRequest<UpdateParaProfessionalCommand>.WithActionResult<ParaProfessionalDto>
{
    private readonly IMediator _mediator;

    public UpdateParaProfessional(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPut("api/para-professionals")]
    [OpenApiOperation(
            "Updates a para-professional",
            "Updates a para-professional on the system")
        ]
    [ProducesResponseType(typeof(ParaProfessionalDto), (int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(ServerResponse), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType((int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<ParaProfessionalDto>> HandleAsync(UpdateParaProfessionalCommand request, CancellationToken cancellationToken = default)
    {
        var (result, data) = await _mediator.Send(request);
        if (result.Succeeded)
            return Ok(data);

        return BadRequest(new ServerResponse(result.Errors));
    }
}
