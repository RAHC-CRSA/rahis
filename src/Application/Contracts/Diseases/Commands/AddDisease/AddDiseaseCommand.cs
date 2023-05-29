using MediatR;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Reports;
using RegionalAnimalHealth.Domain.Entities.Reports;

namespace RegionalAnimalHealth.Application.Contracts.Regions.Commands.AddDisease;
public class AddDiseaseCommand : IRequest<(Result, DiseaseDto?)>
{
    public string Name { get; set; }
    public string Code { get; set; }
    public string Classification { get; set; }
    public bool Zoonotic { get; set; }
}

public class AddDiseaseCommandHandler : IRequestHandler<AddDiseaseCommand, (Result, DiseaseDto?)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<AddDiseaseCommand> _logger;

    public AddDiseaseCommandHandler(IApplicationDbContext context, ILogger<AddDiseaseCommand> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(Result, DiseaseDto?)> Handle(AddDiseaseCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var disease = Disease.Create(request.Name, request.Code, request.Classification, request.Zoonotic);
            await _context.Diseases.AddAsync(disease);
            await _context.SaveChangesAsync(cancellationToken);

            var diseaseDto = new DiseaseDto
            {
                Id = disease.Id,
                Name = disease.Name,
                Classification = disease.Classification,
                Zoonotic = disease.Zoonotic,
            };

            return (Result.Success(), diseaseDto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return (Result.Failure(new List<string> { ex.Message }), null);
        }
    }
}
