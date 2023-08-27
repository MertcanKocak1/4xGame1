using Entities.MongoDbEntity;

namespace Entities.Building
{
    public class Building : BaseMongoDbEntity
    {
        public string BuildingType { get; set; }
        public double BuildingCost { get; set; }
        public int ConstructionTime { get; set; }
        public bool IsDeleted { get; set; }

    }
}
