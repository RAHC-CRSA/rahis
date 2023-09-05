using MediatR;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Domain.Models.Messaging;

namespace RegionalAnimalHealth.Application.Contracts.Auth.Commands.ResetPassword;
public class ResetPasswordCommand : IRequest<Result>
{
    public string Email { get; set; }
}

public class ResetPasswordCommandHandler : IRequestHandler<ResetPasswordCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IIdentityService _identityService;
    private readonly IEmailService _emailService;
    private readonly IHostingEnvironmentService _hostingEnvironment;
    private readonly ILogger<ResetPasswordCommand> _logger;

    public ResetPasswordCommandHandler(IApplicationDbContext context, IIdentityService identityService, IEmailService emailService, IHostingEnvironmentService hostingEnvironment, ILogger<ResetPasswordCommand> logger)
    {
        _context = context;
        _identityService = identityService;
        _emailService = emailService;
        _hostingEnvironment = hostingEnvironment;
        _logger = logger;
    }

    public async Task<Result> Handle(ResetPasswordCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var (result, resetToken) = await _identityService.CreatePasswordResetTokenAsync(request.Email);

            if (!result.Succeeded)
            {
                return result;
            }

            // Send email with reset link
            var link = $"{_hostingEnvironment.BaseUrl}reset-password?token={resetToken}";
            var subject = $"You requested a password reset on your RAHIS account";
            var content = $"You have requested to reset the password on your RAHIS account. Click the link <a href='{link}'><strong>{link}</strong></a> to complete your password reset. If you did not request this password reset, please ignore this email.<br>";
            var message = EmailNotification.Create(content, request.Email, subject);

            var emailResult = await _emailService.SendEmailAsync(message, EmailNotification.TemplateId);

            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return Result.Failure(new List<string> { ex.Message });
        }
    }
}
