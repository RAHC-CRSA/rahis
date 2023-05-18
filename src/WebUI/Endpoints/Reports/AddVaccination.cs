using System.Net;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.Reports.Commands.AddVaccination;
using Swashbuckle.AspNetCore.Annotations;

namespace WebUI.Endpoints.Reports;

[OpenApiTag("Reports")]
public class AddVaccination : EndpointBaseAsync.WithRequest<AddVaccinationCommand>.WithActionResult
{
    private readonly IMediator _mediator;

    public AddVaccination(IMediator mediator)
    {
        _mediator = mediator;
    }

    [Authorize(Roles = SecurityRoles.Reporter)]
    [HttpPost("api/reports/add-vaccination")]
    [OpenApiOperation(
            "Adds a vaccination record to a report",
            "Adds a vaccination record to a report")
        ]
    [ProducesResponseType((int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(string), (int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult> HandleAsync(AddVaccinationCommand request, CancellationToken cancellationToken = default)
    {
        var result = await _mediator.Send(request);
        if (result.Succeeded)
            return Ok("Successfully added vaccination.");

        return BadRequest(result.Errors.ToArray());
    }
}
