﻿using FluentValidation;

namespace RegionalAnimalHealth.Application.Contracts.Users.Queries.GetUser;
public class GetUserQueryValidator : AbstractValidator<GetUserQuery>
{

    public GetUserQueryValidator()
    {
        RuleFor(x => x.UserId)
            .NotEmpty().WithMessage("User id is required.");
    }
}
