using FluentValidation;

namespace RegionalAnimalHealth.Application.Contracts.Regions.Commands.AddCommunity;
public class AddCommunityCommandValidator : AbstractValidator<AddCommunityCommand>
{
    public AddCommunityCommandValidator()
    {
        RuleFor(c => c.DistrictId)
            .NotEmpty().WithMessage("District id is required");

        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Name is required.");
    }
}
