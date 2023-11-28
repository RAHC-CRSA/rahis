using FluentValidation;

namespace RegionalAnimalHealth.Application.Contracts.Auth.Commands.SetPassword;
public class SetPasswordCommandValidator : AbstractValidator<SetPasswordCommand>
{
    public SetPasswordCommandValidator()
    {
        RuleFor(x => x.ResetToken)
            .NotEmpty().WithMessage("Reset token cannot be null");

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Password is required");
    }
}
