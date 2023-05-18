using FluentValidation;

namespace RegionalAnimalHealth.Application.Contracts.Species.Commands.AddSpecies;
internal class AddSpeciesCommandValidator : AbstractValidator<AddSpeciesCommand>
{
    public AddSpeciesCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Species name is required.");
    }
}
