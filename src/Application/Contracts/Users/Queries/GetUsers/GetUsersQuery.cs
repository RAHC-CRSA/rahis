using System.Data;
using MediatR;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;

namespace RegionalAnimalHealth.Application.Contracts.Users.Queries.GetUsers;
public class GetUsersQuery : IRequest<(Result, List<UserListDto>?)>
{
}

public class GetUserQueryHandler : IRequestHandler<GetUsersQuery, (Result, List<UserListDto>?)>
{
    private readonly IApplicationRawDbContext _rawContext;
    private readonly ILogger<GetUsersQuery> _logger;

    public GetUserQueryHandler(IApplicationRawDbContext rawContext, ILogger<GetUsersQuery> logger)
    {
        _rawContext = rawContext;
        _logger = logger;
    }

    public async Task<(Result, List<UserListDto>?)> Handle(GetUsersQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var sql = $"SELECT u.Id, concat(u.FirstName, ' ', u.LastName) as Name, u.Email, c.Name as Country, c.Flag as CountryFlag, " +
            $"(SELECT SUBSTRING ((SELECT ',' + r.Name FROM AspNetRoles AS r " +
            $"LEFT JOIN AspNetUserRoles AS ur ON ur.RoleId = r.Id WHERE ur.UserId = u.Id FOR XML PATH('')),2,2000)) AS Roles FROM AspNetUsers AS u LEFT JOIN Countries AS c ON u.CountryId = c.Id";

            var result = await _rawContext.QueryAsync<UserListDto>(sql, null, CommandType.Text, null, cancellationToken);
            return (Result.Success(), result.ToList());
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return (Result.Failure(new List<string> { ex.Message }), null);
        }
    }
}
