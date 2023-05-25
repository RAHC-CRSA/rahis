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
using RegionalAnimalHealth.Application.Contracts.Institutions.Queries.GetParaProfessionals;

namespace WebUI.Endpoints.Institutions;

[OpenApiTag("ParaProfessionals")]
[Authorize(Roles = $"{SecurityRoles.SuperAdmin}, {SecurityRoles.Admin}, {SecurityRoles.Reporter}", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class GetParaProfessionals : EndpointBaseAsync.WithRequest<long?>.WithActionResult<List<ParaProfessionalDto>>
{
    private readonly IMediator _mediator;

    public GetParaProfessionals(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("api/para-professionals")]
    [OpenApiOperation(
            "Gets the list of para-professionals",
            "Gets the list of para-professionals in the system")
        ]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(List<ParaProfessionalDto>), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType((int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<List<ParaProfessionalDto>>> HandleAsync(long? institutionId, CancellationToken cancellationToken = default)
    {
        var (result, data) = await _mediator.Send(new GetParaProfessionalsQuery { InstitutionId = institutionId });
        if (result.Succeeded)
            return Ok(data);

        return BadRequest(new ServerResponse(result.Errors));
    }
}