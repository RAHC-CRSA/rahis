﻿using System.Net;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Regions;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.Regions.Commands.AddRegion;

namespace WebUI.Endpoints.Regions;

[OpenApiTag("Regions")]
[Authorize(Roles = $"{SecurityRoles.SuperAdmin}, {SecurityRoles.Admin}, {SecurityRoles.Reporter}", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class AddRegion : EndpointBaseAsync.WithRequest<AddRegionCommand>.WithActionResult<RegionDto>
{
    private readonly IMediator _mediator;

    public AddRegion(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost("api/regions")]
    [OpenApiOperation(
            "Adds a region to a country",
            "Adds a region to a country in the system")
        ]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(ServerResponse), (int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<RegionDto>> HandleAsync(AddRegionCommand request, CancellationToken cancellationToken = default)
    {
        var (result, data) = await _mediator.Send(request);
        if (result.Succeeded)
            return Ok(data);

        return BadRequest(new ServerResponse(result.Errors));
    }
}
