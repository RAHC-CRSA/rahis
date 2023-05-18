using FluentValidation;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Commands.UpdateActions;
public class UpdateActionsCommandValidator : AbstractValidator<UpdateActionsCommand>
{
    public UpdateActionsCommandValidator()
    {
        RuleFor(x => x.ReportId)
            .NotEmpty().WithMessage("Report id must be provided.");

        RuleFor(x => x.TreatmentDetails)
            .NotEmpty().When(x => x.Treatment).WithMessage("Treatment details must be provided.");
    }
}
