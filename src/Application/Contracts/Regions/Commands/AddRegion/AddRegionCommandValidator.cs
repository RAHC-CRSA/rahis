using FluentValidation;

namespace RegionalAnimalHealth.Application.Contracts.Regions.Commands.AddRegion;
public class AddRegionCommandValidator : AbstractValidator<AddRegionCommand>
{
    public AddRegionCommandValidator()
    {
        RuleFor(c => c.CountryId)
            .NotEmpty().WithMessage("Country id is required");

        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Name is required.");
    }
}
