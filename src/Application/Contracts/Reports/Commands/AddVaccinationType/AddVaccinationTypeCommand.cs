using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MediatR;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Reports;
using RegionalAnimalHealth.Domain.Entities.Reports;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Commands.AddVaccinationType;
public class AddVaccinationTypeCommand : IRequest<(Result, VaccinationTypeDto?)>
{
    public string Name { get; set; }
}

public class AddVaccinationTypeCommandHandler : IRequestHandler<AddVaccinationTypeCommand, (Result, VaccinationTypeDto?)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<AddVaccinationTypeCommand> _logger;

    public AddVaccinationTypeCommandHandler(IApplicationDbContext context, ILogger<AddVaccinationTypeCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(Result, VaccinationTypeDto?)> Handle(AddVaccinationTypeCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var vaccinationType = VaccinationType.Create(request.Name);

            await _context.VaccinationTypes.AddAsync(vaccinationType);
            await _context.SaveChangesAsync(cancellationToken);

            var data = new VaccinationTypeDto
            {
                Id = vaccinationType.Id,
                Name = vaccinationType.Name,
            };

            return (Result.Success(), data);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return (Result.Failure(new List<string> { ex.Message }), null);
        }
    }
}
