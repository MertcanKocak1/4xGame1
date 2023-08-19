using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Entities.MongoDbEntity
{
    public interface IMongoDbEntity<TKey>
    {
        TKey Id { get; set; }
    }

    public class BaseMongoDbEntity : IMongoDbEntity<ObjectId>
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId Id { get; set; }

        [BsonElement("CreateTime")]
        public DateTime CreateTime { get; set; } = DateTime.UtcNow;
    }
}
