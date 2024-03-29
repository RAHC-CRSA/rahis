﻿using System.Net;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.Users.Commands.CreateUser;
using RegionalAnimalHealth.Application.Contracts.Users.Queries.GetUsers;

namespace WebUI.Endpoints.Accounts;

[Authorize(Roles = SecurityRoles.SuperAdmin, AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
[OpenApiTag("Accounts")]
public class CreateUser : EndpointBaseAsync.WithRequest<CreateUserCommand>.WithActionResult<UserListDto>
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
    [ProducesResponseType(typeof(UserListDto), (int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(ServerResponse), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType((int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<UserListDto>> HandleAsync(CreateUserCommand request, CancellationToken cancellationToken = default)
    {
        var (result, user) = await _mediator.Send(request, cancellationToken);
        if (result.Succeeded)
            return Ok(user);

        return BadRequest(new ServerResponse(result.Errors));
    }
}
