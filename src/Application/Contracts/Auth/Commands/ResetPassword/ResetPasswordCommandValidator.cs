using FluentValidation;

namespace RegionalAnimalHealth.Application.Contracts.Auth.Commands.ResetPassword;
public class ResetPasswordCommandValidator : AbstractValidator<ResetPasswordCommand>
{
    public ResetPasswordCommandValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email address is required")
            .EmailAddress().WithMessage("The email address provided is invalid");
    }
}
