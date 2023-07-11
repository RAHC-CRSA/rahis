using FluentValidation;

namespace RegionalAnimalHealth.Application.Contracts.NotificationRecipients.Commands.AddRecipient;
internal class AddRecipientCommandValidator : AbstractValidator<AddRecipientCommand>
{
    public AddRecipientCommandValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Recipient name is required.");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Recipient email is required.")
            .EmailAddress().WithMessage("Input is not a valid email address");
    }
}
