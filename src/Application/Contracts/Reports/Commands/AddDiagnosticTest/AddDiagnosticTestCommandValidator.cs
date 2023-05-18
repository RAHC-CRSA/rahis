using FluentValidation;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Commands.AddDiagnosticTest;
public class AddDiagnosticTestCommandValidator : AbstractValidator<AddDiagnosticTestCommand>
{

    public AddDiagnosticTestCommandValidator()
    {
        RuleFor(x  => x.ReportId)
            .NotEmpty().WithMessage("Report id is required.");

        RuleFor(x => x.NumberTested)
            .NotEmpty().WithMessage("Number tested must be specified.");

        RuleFor(x => x.ProfessionalId)
            .NotEmpty().WithMessage("Professional id is required.");
    }
}
