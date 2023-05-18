using System.Net;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models.Reports;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.Reports.Commands.AddVaccinationType;

namespace WebUI.Endpoints.Reports;

[OpenApiTag("Reports")]
public class AddVaccinationType : EndpointBaseAsync.WithRequest<AddVaccinationTypeCommand>.WithActionResult<VaccinationTypeDto>
{
    private readonly IMediator _mediator;

    public AddVaccinationType(IMediator mediator)
    {
        _mediator = mediator;
    }

    [Authorize(Roles = SecurityRoles.Reporter)]
    [HttpPost("api/reports/add-vaccination-type")]
    [OpenApiOperation(
            "Adds a vaccination type",
            "Adds a vaccination type to the system")
        ]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(string), (int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<VaccinationTypeDto>> HandleAsync(AddVaccinationTypeCommand request, CancellationToken cancellationToken = default)
    {
        var (result, data) = await _mediator.Send(request);
        if (result.Succeeded)
            return Ok(data);

        return BadRequest(result.Errors.ToArray());
    }
}
