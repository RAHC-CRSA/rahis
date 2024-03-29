﻿using FluentValidation;

namespace RegionalAnimalHealth.Application.Contracts.Auth.Commands.CreateAuthToken;
public class CreateAuthTokenCommandValidator : AbstractValidator<CreateAuthTokenCommand>
{
    public CreateAuthTokenCommandValidator()
    {
        RuleFor(x => x.Username)
            .NotEmpty().WithMessage("Username is required.");

        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("Password is required.");

        //RuleFor(x => x.Password)
        //    .NotEmpty().WithMessage("Password is required.")
        //    .Matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+=!*()@%&]).{8,}$").WithMessage("Password does not meet the required format.");
    }
}
