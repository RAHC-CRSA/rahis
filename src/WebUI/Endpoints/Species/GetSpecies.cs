﻿using System.Net;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Species;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.Species.Queries.GetSpecies;

namespace WebUI.Endpoints.Species;

[OpenApiTag("Species")]
[Authorize(Roles = $"{SecurityRoles.SuperAdmin}, {SecurityRoles.Admin}, {SecurityRoles.Reporter}", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class GetSpecies : EndpointBaseAsync.WithoutRequest.WithActionResult<List<SpeciesDto>>
{
    private readonly IMediator _mediator;

    public GetSpecies(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("api/species")]
    [OpenApiOperation(
            "Gets the list of species",
            "Gets the list of species in the system")
        ]
    [ProducesResponseType(typeof(List<SpeciesDto>), (int)HttpStatusCode.OK)]
    [ProducesResponseType((int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType(typeof(string), (int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<List<SpeciesDto>>> HandleAsync(CancellationToken cancellationToken = default)
    {
        var (result, data) = await _mediator.Send(new GetSpeciesQuery());
        if (result.Succeeded)
            return Ok(data);

        return BadRequest(new ServerResponse(result.Errors));
    }
}
