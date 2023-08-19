using Entities.MongoDbEntity;
using System.Linq.Expressions;

namespace DataAccessLayer.Abstract.Repository
{
    public interface IMongoRepository<T, TKey> where T : BaseMongoDbEntity
    {
        Task<IEnumerable<T>> Get(Expression<Func<T, bool>> predicate = null);
        Task<T> GetAsync(Expression<Func<T, bool>> predicate);
        Task<T> GetByIdAsync(TKey id);
        Task<T> AddAsync(T entity);
        Task<bool> AddRangeAsync(IEnumerable<T> entities);
        Task<T> UpdateAsync(T entity);
        Task<bool> DeleteAsync(T entity);
        Task<bool> DeleteAsync(TKey id);
    }
}
