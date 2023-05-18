using RegionalAnimalHealth.Application.Common.Models;
using System.Data;

namespace RegionalAnimalHealth.Application.Common.Interfaces;
public interface IApplicationRawDbContext
{
    Task<IReadOnlyList<T>> QueryAsync<T>(string sql, object param = null, CommandType type = CommandType.Text, IDbTransaction transaction = null,
            CancellationToken cancellationToken = default);
    Task<T> QueryFirstOrDefaultAsync<T>(string sql, object param = null, IDbTransaction transaction = null,
        CancellationToken cancellationToken = default);
    Task<T> QuerySingleAsync<T>(string sql, object param = null, IDbTransaction transaction = null,
        CancellationToken cancellationToken = default, CommandType type = CommandType.Text);
    Task<PaginatedList<T>> QueryCountThenItemsAsync<T>(string sql, int pageNumber, int pageSize, object param = null,
        IDbTransaction transaction = null,
        CancellationToken cancellationToken = default);
}
