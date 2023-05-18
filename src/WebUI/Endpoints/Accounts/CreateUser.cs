using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models.Personas;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.Users.Commands.CreateUser;
using Swashbuckle.AspNetCore.Annotations;
namespace WebUI.Endpoints.Accounts;

[Authorize(Roles = SecurityRoles.SuperAdmin, AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
[OpenApiTag("Accounts")]
public class CreateUser : EndpointBaseAsync.WithRequest<CreateUserCommand>.WithActionResult<UserDto>
{
    private readonly IMediator _mediator;

    public CreateUser(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("api/account/CreateUser")]
    [OpenApiOperation(
            "Allows an admin to create a user account",
            "Allows an admin to create a user account")
        ]
    public override async Task<ActionResult<UserDto>> HandleAsync(CreateUserCommand request, CancellationToken cancellationToken = default)
    {
        var (result, user) = await _mediator.Send(request, cancellationToken);

        if (user != null)
        {
            return Ok(user);
        }
        return BadRequest(string.Join(", ", result.Errors));
    }
}
