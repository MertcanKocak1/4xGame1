using DataAccessLayer.Abstract.Repository;
using Entities.Configurations;
using Entities.MongoDbEntity;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Linq.Expressions;

namespace DataAccessLayer.MongoDb
{
    public class MongoRepository<T, TKey> : IMongoRepository<T, TKey>
        where T : BaseMongoDbEntity
    {
        protected readonly IMongoCollection<T> Collection;

        public MongoRepository(IMongoClient client, IOptions<MongoDbSettings> settings)
        {
            var database = client.GetDatabase(settings.Value.DatabaseName);
            Collection = database.GetCollection<T>(typeof(T).Name);
        }

        public async Task<IEnumerable<T>> Get(Expression<Func<T, bool>> predicate = null)
        {
            if (predicate == null)
                return await Collection.Find(Builders<T>.Filter.Empty).ToListAsync();
            else
                return await Collection.Find(predicate).ToListAsync();
        }

        public async Task<T> GetAsync(Expression<Func<T, bool>> predicate)
        {
            return await Collection.Find(predicate).FirstOrDefaultAsync();
        }

        public async Task<T> GetByIdAsync(TKey id)
        {
            return await Collection.Find(Builders<T>.Filter.Eq("_id", id)).FirstOrDefaultAsync();
        }

        public async Task<T> AddAsync(T entity)
        {
            await Collection.InsertOneAsync(entity);
            return entity;
        }

        public async Task<bool> AddRangeAsync(IEnumerable<T> entities)
        {
            await Collection.InsertManyAsync(entities);
            return true;
        }

        public async Task<T> UpdateAsync(T entity)
        {
            var filter = Builders<T>.Filter.Eq("_id", entity.Id);
            await Collection.ReplaceOneAsync(filter, entity);
            return entity;
        }

        public async Task<bool> DeleteAsync(T entity)
        {
            var filter = Builders<T>.Filter.Eq("_id", entity.Id);
            var result = await Collection.DeleteOneAsync(filter);
            return result.IsAcknowledged;
        }

        public async Task<bool> DeleteAsync(TKey id)
        {
            var filter = Builders<T>.Filter.Eq("_id", id);
            var result = await Collection.DeleteOneAsync(filter);
            return result.IsAcknowledged;
        }
    }
}