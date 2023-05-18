using MediatR;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Personas;
using RegionalAnimalHealth.Domain.Exceptions;
using RegionalAnimalHealth.Domain.Models.Messaging;

namespace RegionalAnimalHealth.Application.Contracts.Users.Commands.CreateUser;
public class CreateUserCommand : IRequest<(Result, UserDto?)>
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public List<string> Roles { get; set; }
}

public class CreateUserCommandHandler : IRequestHandler<CreateUserCommand, (Result, UserDto?)>
{
    private readonly IIdentityService _identityService;
    private readonly IEmailService _emailService;
    private readonly ILogger<CreateUserCommand> _logger;

    public CreateUserCommandHandler(IIdentityService identityService, IEmailService emailService, ILogger<CreateUserCommand> logger)
    {
        _identityService = identityService;
        _emailService = emailService;
        _logger = logger;
    }

    public async Task<(Result, UserDto?)> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var (result, userId) = await _identityService.CreateUserAsync(request.Username, request.Password, request.FirstName, request.LastName);

            if (!result.Succeeded)
            {
                return (Result.Failure(result.Errors), null);
            }

            if (request.Roles.Count > 0)
            {
                await _identityService.AddUserToRoles(userId, request.Roles);
            }

            // Send email with login credentials (to be reviewed)
            var subject = $"Your RAHIS account has been created, {request.FirstName}";
            var content = $"Your <strong>{request.Roles[0]}</strong> account has been created successfully with the following credentials:<br><br><strong>Username:</strong> {request.Username}<br><strong>Password:</strong> {request.Password}<br>";
            var message = EmailNotification.Create(content, request.Email, subject, request.FirstName);

            var emailResult = await _emailService.SendEmailAsync(message, EmailNotification.TemplateId);

            var user = new UserDto
            {
                Id = userId,
                Name = $"{request.FirstName} {request.LastName}",
                Email = request.Email,
                UserName = request.Username,
            };

            return (result, user);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            throw;
        }

        
    }
}
