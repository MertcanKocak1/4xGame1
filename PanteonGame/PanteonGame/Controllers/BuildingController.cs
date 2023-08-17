using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.OData.Query;
using DTO.Results;

namespace PanteonGame.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuildingController : ControllerBase
    {
        [HttpGet]
        [EnableQuery]
        public IQueryable<RsBuilding> Get()
        {
            // Sahte veri listesi oluştur
            var buildings = new List<RsBuilding>
    {
        new RsBuilding { Id = 1, BuildingType = "Type A", BuildingCost = 1000.5, ConstructionTime = 120 },
        new RsBuilding { Id = 2, BuildingType = "Type B", BuildingCost = 1500.75, ConstructionTime = 150 },
        new RsBuilding { Id = 3, BuildingType = "Type C", BuildingCost = 2000.25, ConstructionTime = 180 }
    };

            // Veriyi AsQueryable olarak dön
            return buildings.AsQueryable();
        }

    }

}
