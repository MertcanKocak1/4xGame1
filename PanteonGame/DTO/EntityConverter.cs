using DTO.Params;
using DTO.Results;
using Entities.Building;
using MongoDB.Bson;

namespace DTO
{
    public static class EntityConverter
    {
        #region Building
        public static Building ToEntity(this PmBuilding dto)
        {
            ObjectId objectId;

            if (!ObjectId.TryParse(dto.Id, out objectId))
            {
                objectId = ObjectId.Empty;
            }
            return new Building
            {
                Id = objectId,
                BuildingType = dto.BuildingType,
                BuildingCost = dto.BuildingCost,
                ConstructionTime = dto.ConstructionTime,
                IsDeleted = dto.IsDeleted
            };
        }

        public static RsBuilding ToResultDto(this Building entity)
        {
            return new RsBuilding
            {
                Id = entity.Id.ToString(),
                BuildingType = entity.BuildingType,
                BuildingCost = entity.BuildingCost,
                ConstructionTime = entity.ConstructionTime,
                IsDeleted = entity.IsDeleted
            };
        }
        #endregion
    }
}
