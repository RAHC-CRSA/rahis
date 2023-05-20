using System.Net;
using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Reports;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.Regions.Commands.AddDisease;

namespace WebUI.Endpoints.Diseases;

[OpenApiTag("Diseases")]
public class AddDisease : EndpointBaseAsync.WithRequest<AddDiseaseCommand>.WithActionResult<DiseaseDto>
{
    private readonly IMediator _mediator;

    public AddDisease(IMediator mediator)
    {
        _mediator = mediator;
    }

    [Authorize(Roles = SecurityRoles.SuperAdmin)]
    [HttpPost("api/diseases")]
    [OpenApiOperation(
            "Adds a disease",
            "Adds a disease to the system")
        ]
    [ProducesResponseType(typeof(DiseaseDto), (int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(ErrorResponse), (int)HttpStatusCode.BadRequest)]
    [ProducesResponseType((int)HttpStatusCode.BadRequest)]
    public override async Task<ActionResult<DiseaseDto>> HandleAsync(AddDiseaseCommand request, CancellationToken cancellationToken = default)
    {
        var (result, data) = await _mediator.Send(request);
        if (result.Succeeded)
            return Ok(data);

        return BadRequest(new ErrorResponse(result.Errors));
    }
}
