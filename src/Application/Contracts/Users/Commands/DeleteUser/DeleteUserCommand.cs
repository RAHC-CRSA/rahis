using MediatR;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;

namespace RegionalAnimalHealth.Application.Contracts.Users.Commands.DeleteUser;
public class DeleteUserCommand : IRequest<Result>
{
    public string Id { get; set; }
}

public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IIdentityService _identityService;
    private readonly ILogger<DeleteUserCommand> _logger;

    public DeleteUserCommandHandler(IApplicationDbContext context, IIdentityService identityService, ILogger<DeleteUserCommand> logger)
    {
        _context = context;
        _identityService = identityService;
        _logger = logger;
    }

    public async Task<Result> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
    {
        try
        {
            return await _identityService.DeleteUserAsync(request.Id);
        }

        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return Result.Failure(new List<string> { ex.Message });
        }
    }
}
