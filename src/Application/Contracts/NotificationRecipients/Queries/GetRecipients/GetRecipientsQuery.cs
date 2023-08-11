using System.Linq.Expressions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.NotificationRecipients;
using RegionalAnimalHealth.Application.Common.Models.Species;
using RegionalAnimalHealth.Domain.Entities.Reports;
using RegionalAnimalHealth.Domain.Exceptions;

namespace RegionalAnimalHealth.Application.Contracts.NotificationRecipients.Queries.GetRecipients;
public class GetRecipientsQuery : IRequest<(Result, List<NotificationRecipientDto>?)>
{
}

public class GetSpeciesQueryHandler : IRequestHandler<GetRecipientsQuery, (Result, List<NotificationRecipientDto>?)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<GetRecipientsQuery> _logger;

    public GetSpeciesQueryHandler(IApplicationDbContext context, ILogger<GetRecipientsQuery> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(Result, List<NotificationRecipientDto>?)> Handle(GetRecipientsQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var recipients = await _context.NotificationRecipients.Where(x => !x.IsDeleted).Select(RecipientsSelectorExpression()).ToListAsync();

            return (Result.Success(),  recipients);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            throw new BusinessRuleException(nameof(GetRecipientsQuery), ex.Message);
        }
    }

    private Expression<Func<NotificationRecipient, NotificationRecipientDto>> RecipientsSelectorExpression()
    {
        return e => new NotificationRecipientDto
        {
            Id = e.Id,
            Name = e.FullName,
            Email = e.EmailAddress,
            Institution = e.Institution,
            IsEnabled = e.IsEnabled
        };
    }

}
