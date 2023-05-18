using FluentValidation;

namespace RegionalAnimalHealth.Application.Contracts.Regions.Commands.AddCountry;
public class AddCountryCommandValidator : AbstractValidator<AddCountryCommand>
{
    public AddCountryCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Country name is required.");
    }
}
