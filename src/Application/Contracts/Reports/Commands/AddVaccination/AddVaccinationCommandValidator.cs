using FluentValidation;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Commands.AddVaccination;
public class AddVaccinationCommandValidator : AbstractValidator<AddVaccinationCommand>
{

    public AddVaccinationCommandValidator()
    {
        RuleFor(x => x.ReportId)
            .NotEmpty().WithMessage("Report id is required.");

        RuleFor(x => x.NumberVaccinated)
            .NotEmpty().WithMessage("Number vaccinated must be specified.");

        RuleFor(x => x.DiseaseId)
            .NotEmpty().WithMessage("Disease id is required.");
    }
}
