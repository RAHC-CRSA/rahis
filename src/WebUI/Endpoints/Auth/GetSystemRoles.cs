using System.Net;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.Auth.Queries.GetSystemRoles;

namespace WebUI.Endpoints.Auth;

[OpenApiTag("Auth")]
[Authorize(Roles = SecurityRoles.SuperAdmin, AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class GetSystemRoles : EndpointBaseAsync.WithoutRequest.WithActionResult<List<string>>
{

    private readonly IMediator _mediator;

    public GetSystemRoles(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("api/authenticate/roles")]
    [OpenApiOperation(
        "Gets all the available roles in the system",
        "Use this endpoint to get all the available roles in the system")
    ]
    [ProducesResponseType(typeof(List<string>), (int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(ServerResponse), (int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<List<string>>> HandleAsync(CancellationToken cancellationToken = default)
    {
        var (result, roles) = await _mediator.Send(new GetSystemRolesQuery(), cancellationToken);
        if (result.Succeeded)
            return Ok(roles);

        return BadRequest(new ServerResponse(result.Errors));
    }
}
