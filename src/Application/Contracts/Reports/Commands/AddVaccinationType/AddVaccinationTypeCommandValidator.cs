using FluentValidation;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Commands.AddVaccinationType;
public class AddVaccinationTypeCommandValidator : AbstractValidator<AddVaccinationTypeCommand>
{
    public AddVaccinationTypeCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Vaccination type name is required.");
    }
}
