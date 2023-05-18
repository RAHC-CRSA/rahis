using FluentValidation;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Commands.CreateReport;
public class CreateReportCommandValidator : AbstractValidator<CreateReportCommand>
{
    public CreateReportCommandValidator()
    {
        RuleFor(x => x.RegionId)
            .NotNull().When(x => x.OccurrenceId == null).WithMessage("Region id must be specified when occurrence id is not provided.");

        RuleFor(x => x.DiseaseId)
            .NotEmpty().WithMessage("Disease id must be specified.");

        RuleFor(x => x.SpeciesId)
            .NotEmpty().WithMessage("Species id must be specified.");
    }
}
