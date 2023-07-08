using System.Net;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Regions;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.Regions.Commands.AddDistrict;

namespace WebUI.Endpoints.Regions;

[OpenApiTag("Districts")]
[Authorize(Roles = $"{SecurityRoles.SuperAdmin}, {SecurityRoles.Admin}", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class AddDistrict : EndpointBaseAsync.WithRequest<AddDistrictCommand>.WithActionResult<DistrictDto>
{
    private readonly IMediator _mediator;

    public AddDistrict(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("api/districts")]
    [OpenApiOperation(
            "Adds a district",
            "Adds a district to the system")
        ]
    [ProducesResponseType(typeof(DistrictDto), (int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(ServerResponse), (int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<DistrictDto>> HandleAsync(AddDistrictCommand request, CancellationToken cancellationToken = default)
    {
        var (result, data) = await _mediator.Send(request);
        if (result.Succeeded)
            return Ok(data);

        return BadRequest(new ServerResponse(result.Errors));
    }
}
