using DTO.Params;

namespace BusinessLayer.Abstract
{
    public interface ILogService
    {
        void LogInfo(PmLog pmLog);
        void LogError(PmLogError pmLogError);
        void LogDetail (PmLogDetail pmLogDetail);
    }
}
