using System.Net;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models.Regions;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.Regions.Commands.AddCountry;

namespace WebUI.Endpoints.Regions;

[OpenApiTag("Countries")]
public class AddCountry : EndpointBaseAsync.WithRequest<AddCountryCommand>.WithActionResult<CountryDto>
{
    private readonly IMediator _mediator;

    public AddCountry(IMediator mediator)
    {
        _mediator = mediator;
    }

    [Authorize(Roles = SecurityRoles.SuperAdmin)]
    [HttpPost("api/countries")]
    [OpenApiOperation(
            "Adds a country",
            "Adds a country to the system")
        ]
    [ProducesResponseType(typeof(CountryDto), (int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(string), (int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<CountryDto>> HandleAsync(AddCountryCommand request, CancellationToken cancellationToken = default)
    {
        var (result, data) = await _mediator.Send(request);
        if (result.Succeeded)
            return Ok(data);

        return BadRequest(result.Errors.ToArray());
    }
}
