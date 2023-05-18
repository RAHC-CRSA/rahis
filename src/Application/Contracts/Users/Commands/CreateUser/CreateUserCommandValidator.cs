using FluentValidation;

namespace RegionalAnimalHealth.Application.Contracts.Users.Commands.CreateUser;
public class CreateUserCommandValidator : AbstractValidator<CreateUserCommand>
{
    public CreateUserCommandValidator()
    {
        RuleFor(x => x.Username)
            .NotEmpty().WithMessage("Username is required.");

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Password is required.");

        RuleFor(x => x.Roles)
            .NotEmpty().WithMessage("At least one user role must be specified.");
    }
}
