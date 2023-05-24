using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models.Reports;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.Regions.Commands.AddDisease;
using System.Data;
using System.Net;
using RegionalAnimalHealth.Application.Contracts.Institutions.Commands.AddParaProfessional;
using RegionalAnimalHealth.Application.Common.Models.Institutions;

namespace WebUI.Endpoints.Institutions;

[OpenApiTag("ParaProfessionals")]
public class AddParaProfessional : EndpointBaseAsync.WithRequest<AddParaProfessionalCommand>.WithActionResult<ParaProfessionalDto>
{
    private readonly IMediator _mediator;

    public AddParaProfessional(IMediator mediator)
    {
        _mediator = mediator;
    }

    [Authorize(Roles = SecurityRoles.SuperAdmin)]
    [HttpPost("api/para-professionals")]
    [OpenApiOperation(
            "Adds a para-professional",
            "Adds a para-professional to the system")
        ]
    [ProducesResponseType(typeof(ParaProfessionalDto), (int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(ErrorResponse), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType((int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<ParaProfessionalDto>> HandleAsync(AddParaProfessionalCommand request, CancellationToken cancellationToken = default)
    {
        var (result, data) = await _mediator.Send(request);
        if (result.Succeeded)
            return Ok(data);

        return BadRequest(new ErrorResponse(result.Errors));
    }
}
