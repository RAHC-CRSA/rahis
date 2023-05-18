using System.Data;
using MediatR;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;

namespace RegionalAnimalHealth.Application.Contracts.Users.Queries.GetUsers;
public class GetUsersQuery : IRequest<List<UserListDto>>
{
}

public class GetUserQueryHandler : IRequestHandler<GetUsersQuery, List<UserListDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IApplicationRawDbContext _rawContext;
    private readonly ILogger<GetUsersQuery> _logger;

    public GetUserQueryHandler(IApplicationDbContext context, IApplicationRawDbContext rawContext, ILogger<GetUsersQuery> logger)
    {
        _context = context;
        _rawContext = rawContext;
        _logger = logger;
    }

    public async Task<List<UserListDto>> Handle(GetUsersQuery request, CancellationToken cancellationToken)
    {
        var sql = $"SELECT u.Id, concat(u.FirstName, ' ', u.LastName) as Name, u.Email, " +
            $"(SELECT SUBSTRING ((SELECT ',' + r.Name FROM AspNetRoles AS r " +
            $"LEFT JOIN AspNetUserRoles AS ur ON ur.RoleId = r.Id WHERE ur.UserId = u.Id FOR XML PATH('')),2,2000)) AS Roles FROM AspNetUsers AS u";

        var result = await _rawContext.QueryAsync<UserListDto>(sql, null, CommandType.Text, null, cancellationToken);
        return result.ToList();
    }
}
