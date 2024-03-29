﻿using System.Net;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Reports;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.Diseases.Queries.GetDiseases;

namespace WebUI.Endpoints.Diseases;

[OpenApiTag("Diseases")]
[Authorize(Roles = $"{SecurityRoles.SuperAdmin}, {SecurityRoles.Admin}, {SecurityRoles.Reporter}", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class GetDiseases : EndpointBaseAsync.WithoutRequest.WithActionResult<List<DiseaseDto>>
{
    private readonly IMediator _mediator;

    public GetDiseases(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("api/diseases")]
    [OpenApiOperation(
            "Gets the list of diseases",
            "Gets the list of diseases in the system")
        ]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(string), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType((int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<List<DiseaseDto>>> HandleAsync(CancellationToken cancellationToken = default)
    {
        var (result, data) = await _mediator.Send(new GetCrossBoundaryDiseasesQuery());
        if (result.Succeeded)
            return Ok(data);

        return BadRequest(new ServerResponse(result.Errors));
    }
}