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
using RegionalAnimalHealth.Application.Contracts.Institutions.Commands.AddInstitution;

namespace WebUI.Endpoints.Institutions;

[OpenApiTag("Institutions")]
[Authorize(Roles = $"{SecurityRoles.SuperAdmin}, {SecurityRoles.Admin}, {SecurityRoles.Reporter}", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class AddInstitution : EndpointBaseAsync.WithRequest<AddInstitutionCommand>.WithActionResult<InstitutionDto>
{
    private readonly IMediator _mediator;

    public AddInstitution(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("api/institutions")]
    [OpenApiOperation(
            "Adds an institution",
            "Adds an institution to the system")
        ]
    [ProducesResponseType(typeof(InstitutionDto), (int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(ServerResponse), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType((int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<InstitutionDto>> HandleAsync(AddInstitutionCommand request, CancellationToken cancellationToken = default)
    {
        var (result, data) = await _mediator.Send(request);
        if (result.Succeeded)
            return Ok(data);

        return BadRequest(new ServerResponse(result.Errors));
    }
}
