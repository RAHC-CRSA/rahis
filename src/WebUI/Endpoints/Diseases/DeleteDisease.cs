using Ardalis.ApiEndpoints;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Application.Contracts.Diseases.Commands.DeleteDisease;

namespace WebUI.Endpoints.Diseases;

[OpenApiTag("Diseases")]
[Authorize(Roles = $"{SecurityRoles.SuperAdmin}, {SecurityRoles.Admin}", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class DeleteDisease : EndpointBaseAsync.WithRequest<DeleteDiseaseCommand>.WithActionResult<long>
{
    private readonly IMediator _mediator;

    public DeleteDisease(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpDelete("api/diseases")]
    [OpenApiOperation(
            "Deletes a disease",
            "Deletes a disease from the system")
        ]
    public override async Task<ActionResult<long>> HandleAsync(DeleteDiseaseCommand request, CancellationToken cancellationToken = default)
    {
        var result = await _mediator.Send(request, cancellationToken);
        if (result.Succeeded)
            return Ok(request.Id);

        return BadRequest(new ServerResponse(result.Errors));
    }
}
