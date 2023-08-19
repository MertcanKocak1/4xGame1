using DTO.Params;
using DTO.Results;
using MongoDB.Bson;

namespace BusinessLayer.Abstract
{
    public interface IBuildingService
    {
        Task<IEnumerable<RsBuilding>> GetAllBuildingsAsync();
        Task<RsBuilding> GetBuildingByIdAsync(ObjectId id);
        Task<RsBuilding> AddBuildingAsync(PmBuilding building);
        Task<bool> UpdateBuildingAsync(PmBuilding building);
        Task<bool> DeleteBuildingAsync(ObjectId id);
    }
}
