using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.Institutions.Commands.DeleteInstitution;
using RegionalAnimalHealth.Application.Contracts.Users.Commands.DeleteUser;
using System.Data;

namespace WebUI.Endpoints.Institutions;

[OpenApiTag("Institutions")]
[Authorize(Roles = $"{SecurityRoles.SuperAdmin}, {SecurityRoles.Admin}", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class DeleteInstitution : EndpointBaseAsync.WithRequest<DeleteInstitutionCommand>.WithActionResult<long>
{
    private readonly IMediator _mediator;

    public DeleteInstitution(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpDelete("api/institutions")]
    [OpenApiOperation(
            "Deletes an institution",
            "Deletes an institution from the system")
        ]
    public override async Task<ActionResult<long>> HandleAsync(DeleteInstitutionCommand request, CancellationToken cancellationToken = default)
    {
        var result = await _mediator.Send(request, cancellationToken);
        if (result.Succeeded)
            return Ok(request.Id);

        return BadRequest(new ServerResponse(result.Errors));
    }
}
