using FluentValidation;

namespace RegionalAnimalHealth.Application.Contracts.Institutions.Commands.AddParaProfessional;
public class AddParaProfessionalCommandValidator : AbstractValidator<AddParaProfessionalCommand>
{
    public AddParaProfessionalCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Name is required.");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email is required.")
            .EmailAddress().WithMessage("Email must be a valid email address.");

        RuleFor(x => x.Phone)
            .NotEmpty().WithMessage("Phone number is required.");

        RuleFor(x => x.Position)
            .NotEmpty().WithMessage("Position is required.");

        RuleFor(x => x.CountryId)
            .NotEmpty().WithMessage("Country id is required.");
    }
}
