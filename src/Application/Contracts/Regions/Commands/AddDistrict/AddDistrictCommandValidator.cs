using FluentValidation;

namespace RegionalAnimalHealth.Application.Contracts.Regions.Commands.AddDistrict;
public class AddDistrictCommandValidator : AbstractValidator<AddDistrictCommand>
{
    public AddDistrictCommandValidator()
    {
        RuleFor(c => c.MunicipalityId)
            .NotEmpty().WithMessage("Municipality id is required");

        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Name is required.");
    }
}
