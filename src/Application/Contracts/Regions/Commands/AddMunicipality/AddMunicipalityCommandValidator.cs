using FluentValidation;

namespace RegionalAnimalHealth.Application.Contracts.Regions.Commands.AddMunicipality;
public class AddMunicipalityCommandValidator : AbstractValidator<AddMunicipalityCommand>
{
    public AddMunicipalityCommandValidator()
    {
        RuleFor(c => c.RegionId)
            .NotEmpty().WithMessage("Region id is required");

        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Name is required.");
    }
}
