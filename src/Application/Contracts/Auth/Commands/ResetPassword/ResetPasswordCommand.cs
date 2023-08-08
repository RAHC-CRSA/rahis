using MediatR;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Domain.Models.Messaging;

namespace RegionalAnimalHealth.Application.Contracts.Auth.Commands.ResetPassword;
public class ResetPasswordCommand : IRequest<(Result, string?)>
{
    public string Email { get; set; }
}

public class ResetPasswordCommandHandler : IRequestHandler<ResetPasswordCommand, (Result, string?)>
{
    private readonly IApplicationDbContext _context;
    private readonly IIdentityService _identityService;
    private readonly IEmailService _emailService;
    private readonly ILogger<ResetPasswordCommand> _logger;

    public ResetPasswordCommandHandler(IApplicationDbContext context, IIdentityService identityService, IEmailService emailService, ILogger<ResetPasswordCommand> logger)
    {
        _context = context;
        _identityService = identityService;
        _emailService = emailService;
        _logger = logger;
    }

    public async Task<(Result, string?)> Handle(ResetPasswordCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var (result, resetToken) = await _identityService.CreatePasswordResetTokenAsync(request.Email);

            if (!result.Succeeded)
            {
                return (result, null);
            }

            // Send email with login credentials (to be reviewed)
            var subject = $"You requested a password reset on your RAHIS account";
            var content = $"You have requested to reset the password on your RAHIS account. Your password reset token is <strong>{resetToken}</strong>. If you did not request this password reset, please ignore this email.<br>";
            var message = EmailNotification.Create(content, request.Email, subject);

            var emailResult = await _emailService.SendEmailAsync(message, EmailNotification.TemplateId);

            return (result, resetToken);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return (Result.Failure(new List<string> { ex.Message }), null);
        }
    }
}
