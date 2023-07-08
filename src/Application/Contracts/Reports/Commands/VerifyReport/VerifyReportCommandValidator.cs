using FluentValidation;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Commands.VerifyReport;
public class VerifyReportCommandValidator : AbstractValidator<VerifyReportCommand>
{
    public VerifyReportCommandValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty().WithMessage("Report id is required.");
    }
}
