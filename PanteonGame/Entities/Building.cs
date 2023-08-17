using Entities.Base;
using System.ComponentModel.DataAnnotations;

namespace Entities
{
    public class Building
    {
        [Key]
        public int Id { get; set; }
        public string BuildingType { get; set; }
        public double BuildingCost { get; set; }
        public int ConstructionTime { get; set; }
    }
}
