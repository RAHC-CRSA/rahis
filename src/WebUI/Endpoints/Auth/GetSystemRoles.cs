using Ardalis.ApiEndpoints;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Security;
using Swashbuckle.AspNetCore.Annotations;

namespace WebUI.Endpoints.Auth;

[OpenApiTag("Auth")]
[Authorize(Roles = SecurityRoles.SuperAdmin, AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class GetSystemRoles : EndpointBaseAsync.WithoutRequest.WithActionResult<List<string>>
{

    private readonly IIdentityService _identityService;
    public GetSystemRoles(IIdentityService identityService)
    {
        _identityService = identityService;
    }

    [HttpGet("api/authenticate/roles")]
    [OpenApiOperation(
        "Gets all the available roles in the system",
        "Use this endpoint to get all the available roles in the system")
    ]
    public override async Task<ActionResult<List<string>>> HandleAsync(CancellationToken cancellationToken = default)
    {
        return Ok(await _identityService.GetAvailableRolesAsync());
    }
}
