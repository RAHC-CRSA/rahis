using FluentValidation;
using RegionalAnimalHealth.Application.Contracts.Institutions.Commands.UpdateProfessional;

namespace RegionalAnimalHealth.Application.Contracts.Institutions.Commands.UpdateParaProfessional;
public class UpdateParaProfessionalCommandValidator : AbstractValidator<UpdateParaProfessionalCommand>
{
    public UpdateParaProfessionalCommandValidator()
    {
        RuleFor(x => x.ParaProfessionalId)
            .NotEmpty().WithMessage("Para professional id is required");

        RuleFor(x => x.Phone)
            .NotEmpty().WithMessage("Phone number is required");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email address is required")
            .EmailAddress().WithMessage("Email is not a valid email address");

        RuleFor(x => x.Position)
            .NotEmpty().WithMessage("Position is required");
    }
}
