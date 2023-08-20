using BusinessLayer.Abstract;
using DataAccessLayer.Abstract.Repository;
using DTO.Params;
using DTO.Results;
using Entities.Building;
using MongoDB.Bson;


namespace BusinessLayer.Concrete
{
    public class BuildingManager : IBuildingService
    {
        private readonly IMongoRepository<Building, ObjectId> _buildingRepository;
        private readonly ILogService _logService;
        private readonly string ClassName = "BuildingManager";

        public BuildingManager(IMongoRepository<Building, ObjectId> buildingRepository, ILogService logService)
        {
            _buildingRepository = buildingRepository;
            _logService = logService;
        }

        public async Task<IEnumerable<RsBuilding>> GetAllBuildingsAsync()
        {
            try
            {
                var buildings = await _buildingRepository.Get();
                _logService.LogInfo(new PmLog { ClassName = ClassName, MethodName = "GetAllBuildingsAsync", DataAfterOperation = buildings?.ToJson(), Message = "Fetched all buildings." });
                return buildings.Select(b => b.ToResultDto()).AsQueryable();
            }
            catch (Exception ex)
            {
                _logService.LogError(new PmLogError { ClassName = ClassName, MethodName = "GetAllBuildingsAsync", ErrorMessage = ex.Message, StackTrace = ex.StackTrace });
                throw;
            }
        }

        public async Task<RsBuilding> GetBuildingByIdAsync(ObjectId id)
        {
            try
            {
                var building = await _buildingRepository.GetByIdAsync(id);
                _logService.LogInfo(new PmLog { ClassName = ClassName, MethodName = "GetBuildingByIdAsync", DataAfterOperation = building?.ToJson(), Message = "Building fetched by ID." });
                return building.ToResultDto();
            }
            catch (Exception ex)
            {
                _logService.LogError(new PmLogError { ClassName = ClassName, MethodName = "GetBuildingByIdAsync", ErrorMessage = ex.Message, StackTrace = ex.StackTrace });
                throw;
            }
        }

        public async Task<RsBuilding> AddBuildingAsync(PmBuilding buildingDto)
        {
            try
            {
                var buildingEntity = buildingDto.ToEntity();
                var addedBuilding = await _buildingRepository.AddAsync(buildingEntity);
                _logService.LogInfo(new PmLog { ClassName = ClassName, MethodName = "AddBuildingAsync", DataBeforeOperation = buildingDto?.ToJson(), DataAfterOperation = addedBuilding?.ToJson(), Message = "Building added successfully." });
                return addedBuilding.ToResultDto();
            }
            catch (Exception ex)
            {
                _logService.LogError(new PmLogError { ClassName = ClassName, MethodName = "AddBuildingAsync", ErrorMessage = ex.Message, StackTrace = ex.StackTrace });
                throw;
            }
        }

        public async Task<bool> UpdateBuildingAsync(PmBuilding buildingDto)
        {
            try
            {
                var buildingEntity = buildingDto.ToEntity();
                var originalBuilding = await _buildingRepository.GetByIdAsync(buildingEntity.Id);
                var updatedBuilding = await _buildingRepository.UpdateAsync(buildingEntity);
                _logService.LogInfo(new PmLog { ClassName = ClassName, MethodName = "UpdateBuildingAsync", DataBeforeOperation = originalBuilding?.ToJson(), DataAfterOperation = updatedBuilding?.ToJson(), Message = "Building updated successfully." });
                return updatedBuilding != null;
            }
            catch (Exception ex)
            {
                _logService.LogError(new PmLogError { ClassName = ClassName, MethodName = "UpdateBuildingAsync", ErrorMessage = ex.Message, StackTrace = ex.StackTrace });
                throw;
            }
        }

        public async Task<bool> DeleteBuildingAsync(ObjectId id)
        {
            try
            {
                var originalBuilding = await _buildingRepository.GetByIdAsync(id);
                var result = await _buildingRepository.DeleteAsync(id);
                if (result)
                {
                    _logService.LogInfo(new PmLog { ClassName = ClassName, MethodName = "DeleteBuildingAsync", DataBeforeOperation = originalBuilding?.ToJson(), Message = "Building deleted successfully." });
                }
                return result;
            }
            catch (Exception ex)
            {
                _logService.LogError(new PmLogError { ClassName = ClassName, MethodName = "DeleteBuildingAsync", ErrorMessage = ex.Message, StackTrace = ex.StackTrace });
                throw;
            }
        }
    }


    public static class BuildingMapper
    {
        public static Building ToEntity(this PmBuilding dto)
        {
            return new Building
            {
                BuildingType = dto.BuildingType,
                BuildingCost = dto.BuildingCost,
                ConstructionTime = dto.ConstructionTime
            };
        }

        public static RsBuilding ToResultDto(this Building entity)
        {
            return new RsBuilding
            {
                Id = entity.Id.ToString(), 
                BuildingType = entity.BuildingType,
                BuildingCost = entity.BuildingCost,
                ConstructionTime = entity.ConstructionTime
            };
        }
    }


}
