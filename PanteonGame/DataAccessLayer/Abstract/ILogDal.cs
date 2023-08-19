using DTO.Params;

namespace DataAccessLayer.Abstract
{
    public interface ILogDal
    {
        void LogInfo(PmLog pmLog);
        void LogDetail(PmLogDetail pmLogDetail);
        void LogError(PmLogError pmLogError);
    }
}
