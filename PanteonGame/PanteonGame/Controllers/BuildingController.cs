using Microsoft.AspNetCore.Mvc;
using DTO.Params;
using MongoDB.Bson;
using BusinessLayer.Abstract;
using Microsoft.AspNetCore.Authorization;

namespace PanteonGame.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuildingController : ControllerBase
    {
        private readonly IBuildingService _buildingService;
        private readonly ILogService _logService;

        public BuildingController(IBuildingService buildingService, ILogService logService)
        {
            _buildingService = buildingService;
            _logService = logService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Get()
        {
            try
            {
                var buildings = await _buildingService.GetAllBuildingsAsync();
                return Ok(buildings);
            }
            catch (Exception ex)
            {
                _logService.LogError(new PmLogError { ClassName = "BuildingController", MethodName = nameof(Get), ErrorMessage = ex.Message, StackTrace = ex.StackTrace });
                return BadRequest();
            }
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetById(string id)
        {
            try
            {
                var objectId = ObjectId.Parse(id);
                var building = await _buildingService.GetBuildingByIdAsync(objectId);

                if (building == null)
                {
                    return NotFound();
                }

                return Ok(building);
            }
            catch (Exception ex)
            {
                _logService.LogError(new PmLogError { ClassName = "BuildingController", MethodName = nameof(GetById), ErrorMessage = ex.Message, StackTrace = ex.StackTrace });
                return BadRequest();
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create(PmBuilding buildingModel)
        {
            try
            {
                var building = await _buildingService.AddBuildingAsync(buildingModel);

                if (building == null)
                {
                    return BadRequest("Building could not be created.");
                }

                return CreatedAtAction(nameof(GetById), new { id = building.Id }, building);
            }
            catch (Exception ex)
            {
                _logService.LogError(new PmLogError { ClassName = "BuildingController", MethodName = nameof(Create), ErrorMessage = ex.Message, StackTrace = ex.StackTrace });
                return BadRequest();
            }
        }

        [HttpPut]
        [Authorize]
        public async Task<IActionResult> Update(PmBuilding buildingModel)
        {
            try
            {
                var result = await _buildingService.UpdateBuildingAsync(buildingModel);

                if (!result)
                {
                    return BadRequest("Building could not be updated.");
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logService.LogError(new PmLogError { ClassName = "BuildingController", MethodName = nameof(Update), ErrorMessage = ex.Message, StackTrace = ex.StackTrace });
                return BadRequest();
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(string id)
        {
            try
            {
                var objectId = ObjectId.Parse(id);
                var result = await _buildingService.DeleteBuildingAsync(objectId);

                if (!result)
                {
                    return NotFound("Building with given ID not found.");
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logService.LogError(new PmLogError { ClassName = "BuildingController", MethodName = nameof(Delete), ErrorMessage = ex.Message, StackTrace = ex.StackTrace });
                return BadRequest();
            }
        }
    }
}
