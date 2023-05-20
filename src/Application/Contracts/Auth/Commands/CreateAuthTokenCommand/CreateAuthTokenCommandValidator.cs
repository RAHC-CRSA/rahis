using FluentValidation;

namespace RegionalAnimalHealth.Application.Contracts.Auth.Commands.CreateAuthTokenCommand;
public class CreateAuthTokenCommandValidator : AbstractValidator<CreateAuthTokenCommand>
{
    public CreateAuthTokenCommandValidator()
    {
        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Password is required.")
            .Matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+=!*()@%&]).{8,}$").WithMessage("Password does not meet the required format.");
    }
}
