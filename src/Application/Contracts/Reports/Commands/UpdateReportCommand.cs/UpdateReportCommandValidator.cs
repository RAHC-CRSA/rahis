using FluentValidation;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Commands.UpdateReport;
public class UpdateReportCommandValidator : AbstractValidator<UpdateReportCommand>
{
    public UpdateReportCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty().WithMessage("Report id is required.");
    }
}
