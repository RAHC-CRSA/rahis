using FluentValidation;

namespace RegionalAnimalHealth.Application.Contracts.Species.Commands.UpdateSpecies;
public class UpdateSpeciesCommandValidator : AbstractValidator<UpdateSpeciesCommand>
{
    public UpdateSpeciesCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty().WithMessage("Species id is required.");

        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Species name is required.");
    }
}
