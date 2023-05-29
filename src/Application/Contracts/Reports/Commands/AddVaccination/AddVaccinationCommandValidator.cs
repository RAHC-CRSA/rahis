using FluentValidation;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Commands.AddVaccination;
public class AddVaccinationCommandValidator : AbstractValidator<AddVaccinationCommand>
{

    public AddVaccinationCommandValidator()
    {
        RuleFor(x => x.ReportId)
            .NotEmpty().WithMessage("Report id is required.");

        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Vaccine name is required.");

        RuleFor(x => x.NumberVaccinated)
            .NotEmpty().WithMessage("Number vaccinated must be specified.");
    }
}
