using System.Data;
using Dapper;
using Microsoft.Data.SqlClient;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Infrastructure.Configurations;

namespace RegionalAnimalHealth.Infrastructure.Persistence;
public class ApplicationRawDbContext : IApplicationRawDbContext
{
    private readonly IDbConnection _connection;

    public ApplicationRawDbContext(RawDbConnectionString connectionString)
    {
        _connection = new SqlConnection(connectionString.Value);
    }

    public async Task<IReadOnlyList<T>> QueryAsync<T>(string sql, object param = null, CommandType type = CommandType.Text, IDbTransaction transaction = null, CancellationToken cancellationToken = default)
    {
        return (await _connection.QueryAsync<T>(sql, param, transaction, commandType: type)).AsList();
    }

    public async Task<PaginatedList<T>> QueryCountThenItemsAsync<T>(string sql, int pageNumber, int pageSize, object param = null, IDbTransaction transaction = null, CancellationToken cancellationToken = default)
    {
        var query = await _connection.QueryMultipleAsync(sql, param, transaction);

        var count = query.Read<int>().Single();
        var items = query.Read<T>().AsQueryable();

        //return PaginatedList<T>.Create(items, count, pageNumber, pageSize);

        return await PaginatedList<T>.CreateAsync(items, pageNumber, pageSize);
    }

    public async Task<T> QueryFirstOrDefaultAsync<T>(string sql, object param = null, IDbTransaction transaction = null, CancellationToken cancellationToken = default)
    {
        return await _connection.QueryFirstOrDefaultAsync<T>(sql, param, transaction);
    }

    public async Task<T> QuerySingleAsync<T>(string sql, object param = null, IDbTransaction transaction = null, CancellationToken cancellationToken = default, CommandType type = CommandType.Text)
    {
        return await _connection.QuerySingleAsync<T>(sql, param, transaction, commandType: type);
    }
}
