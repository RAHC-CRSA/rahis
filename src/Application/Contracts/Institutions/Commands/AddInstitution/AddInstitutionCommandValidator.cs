using FluentValidation;

namespace RegionalAnimalHealth.Application.Contracts.Institutions.Commands.AddInstitution;
public class AddInstitutionCommandValidator : AbstractValidator<AddInstitutionCommand>
{
    public AddInstitutionCommandValidator()
    {
        RuleFor(x => x.CountryId)
            .NotEmpty().WithMessage("Country id is required.");
    }
}
