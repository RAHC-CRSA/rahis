using FluentValidation;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Commands.AddDiagnosticTestType;
public class AddDiagnosticTestTypeCommandValidator : AbstractValidator<AddDiagnosticTestTypeCommand>
{
    public AddDiagnosticTestTypeCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Diagnostic test type name is required.");
    }
}
