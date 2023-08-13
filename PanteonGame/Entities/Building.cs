using Entities.Base;

namespace Entities
{
    public class Building : EntityBase
    {
        public string BuildingType { get; set; }
        public double BuildingCost { get; set; }
        public int ConstructionTime { get; set; }
    }
}
