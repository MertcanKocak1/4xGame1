using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO.Params
{
    public class PmBuilding
    {
        public int Id { get; set; }
        public string BuildingType { get; set; }
        public double BuildingCost { get; set; }
        public int ConstructionTime { get; set; }
    }
}
