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

namespace RegionalAnimalHealth.Application.Contracts.Reports.Commands.AddMedication;
public class AddMedicationCommand : IRequest<(Result, MedicationDto?)>
{
    public string Name { get; set; }
    public string Dosage { get; set; }
    public long ReportId { get; set; }
}

public class AddMedicationCommandHandler : IRequestHandler<AddMedicationCommand, (Result, MedicationDto?)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<AddMedicationCommand> _logger;

    public AddMedicationCommandHandler(IApplicationDbContext context, ILogger<AddMedicationCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(Result, MedicationDto?)> Handle(AddMedicationCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var med = Medication.Create(request.ReportId, request.Name, request.Dosage);

            await _context.Medications.AddAsync(med);
            await _context.SaveChangesAsync(cancellationToken);

            var data = new MedicationDto
            {
                ReportId = request.ReportId,
                Name = request.Name,
                Dosage = request.Dosage,
            };

            return (Result.Success(), data);
        }
        catch (Exception ex)
        {
            return (Result.Failure(new List<string> { ex.Message }), null);
        }
    }
}
