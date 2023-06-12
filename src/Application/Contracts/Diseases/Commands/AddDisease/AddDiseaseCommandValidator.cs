using FluentValidation;
using RegionalAnimalHealth.Application.Contracts.Regions.Commands.AddDisease;

namespace RegionalAnimalHealth.Application.Contracts.Diseases.Commands.AddDisease;
public class AddDiseaseCommandValidator : AbstractValidator<AddDiseaseCommand>
{
    public AddDiseaseCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Disease name is required");

        RuleFor(x => x.SpeciesId)
            .NotEmpty().WithMessage("Species id is required");
    }
}
