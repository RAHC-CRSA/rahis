using System.Net;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models.Regions;
using RegionalAnimalHealth.Application.Contracts.Users.Queries.GetUsers;

namespace WebUI.Endpoints.Users;

[OpenApiTag("Users")]
public class GetUsers : EndpointBaseAsync.WithoutRequest.WithActionResult<List<UserListDto>>
{
    private readonly IMediator _mediator;

    public GetUsers(IMediator mediator)
    {
        _mediator = mediator;
    }

    [Authorize]
    [HttpGet("api/users")]
    [OpenApiOperation(
            "Gets the list of users",
            "Gets the list of users in the system")
        ]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType(typeof(string), (int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<List<UserListDto>>> HandleAsync(CancellationToken cancellationToken = default)
    {
       var result = await _mediator.Send(new GetUsersQuery());
        return Ok(result);
    }
}
