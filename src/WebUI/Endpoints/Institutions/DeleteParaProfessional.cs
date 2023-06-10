using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.Institutions.Commands.DeleteParaProfessional;
using RegionalAnimalHealth.Application.Contracts.Users.Commands.DeleteUser;
using System.Data;

namespace WebUI.Endpoints.Institutions;

[OpenApiTag("ParaProfessionals")]
[Authorize(Roles = $"{SecurityRoles.SuperAdmin}, {SecurityRoles.Admin}", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class DeleteParaProfessional : EndpointBaseAsync.WithRequest<DeleteParaProfessionalCommand>.WithActionResult<long>
{
    private readonly IMediator _mediator;

    public DeleteParaProfessional(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpDelete("api/para-professionals")]
    [OpenApiOperation(
            "Deletes a para-professional",
            "Deletes a para-professional from the system")
        ]
    public override async Task<ActionResult<long>> HandleAsync(DeleteParaProfessionalCommand request, CancellationToken cancellationToken = default)
    {
        var result = await _mediator.Send(request, cancellationToken);
        if (result.Succeeded)
            return Ok(request.Id);

        return BadRequest(new ServerResponse(result.Errors));
    }
}
