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
using RegionalAnimalHealth.Application.Contracts.Institutions.Queries.GetInstitutions;

namespace WebUI.Endpoints.Institutions;

[OpenApiTag("Institutions")]
[Authorize(Roles = $"{SecurityRoles.SuperAdmin}, {SecurityRoles.Admin}, {SecurityRoles.Reporter}", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class GetInstitutions : EndpointBaseAsync.WithRequest<long?>.WithActionResult<List<InstitutionDto>>
{
    private readonly IMediator _mediator;

    public GetInstitutions(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("api/institutions")]
    [OpenApiOperation(
            "Gets the list of institutions",
            "Gets the list of institutions in the system")
        ]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(List<InstitutionDto>), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType((int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<List<InstitutionDto>>> HandleAsync(long? countryId, CancellationToken cancellationToken = default)
    {
        var (result, data) = await _mediator.Send(new GetInstitutionsQuery { CountryId = countryId });
        if (result.Succeeded)
            return Ok(data);

        return BadRequest(new ServerResponse(result.Errors));
    }
}
