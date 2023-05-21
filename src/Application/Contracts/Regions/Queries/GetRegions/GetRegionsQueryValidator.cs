using FluentValidation;

namespace RegionalAnimalHealth.Application.Contracts.Regions.Queries.GetRegions;
public class GetRegionsQueryValidator : AbstractValidator<GetRegionsQuery>
{
    public GetRegionsQueryValidator()
    {
        RuleFor(x => x.CountryId)
            .NotEmpty().WithMessage("Country id is required.");
    }
}
