using System.Net;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Reports;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.Reports.Commands.AddVaccination;
using Swashbuckle.AspNetCore.Annotations;

namespace WebUI.Endpoints.Reports;

[OpenApiTag("Reports")]
public class AddVaccination : EndpointBaseAsync.WithRequest<AddVaccinationCommand>.WithActionResult<VaccinationDto>
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
    [ProducesResponseType(typeof(VaccinationDto), (int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<VaccinationDto>> HandleAsync(AddVaccinationCommand request, CancellationToken cancellationToken = default)
    {
        var (result, data)= await _mediator.Send(request);
        if (result.Succeeded)
            return Ok(data);

        return BadRequest(new ErrorResponse(result.Errors));
    }
}
