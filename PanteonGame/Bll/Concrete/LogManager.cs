using BusinessLayer.Abstract;
using DataAccessLayer.Concrete;
using DTO.Params;

namespace BusinessLayer.Concrete
{
    public class LogManager : ILogService
    {
        private readonly LogDal _logDal;

        public LogManager(AppDbContext context)
        {
            _logDal = new LogDal(context);
        }

        public void LogInfo(PmLog pmLog)
        {
            _logDal.LogInfo(pmLog);
        }

        public void LogDetail(PmLogDetail pmLogDetail)
        {
            _logDal.LogDetail(pmLogDetail);
        }

        public void LogError(PmLogError pmLogError)
        {
            _logDal.LogError(pmLogError);
        }
       
    }
}
