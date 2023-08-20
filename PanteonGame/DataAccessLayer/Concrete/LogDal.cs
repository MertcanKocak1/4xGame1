using DTO.Params;
using Entities.Log;

namespace DataAccessLayer.Concrete
{
    public class LogDal
    {
        private readonly AppDbContext _context;

        public LogDal(AppDbContext context)
        {
            _context = context;
        }

        public void LogInfo(PmLog pmLog)
        {
            var ent = BringNewLog();
            ent.Message = pmLog.Message;
            ent.DateCreated = DateTime.UtcNow; 
            ent.ClassName = pmLog.ClassName;

            _context.Logs.Add(ent);
            _context.SaveChanges();
            if (pmLog.DataBeforeOperation != null)
            {
                PmLogDetail pmLogDetail = new PmLogDetail();
                pmLogDetail.DataAfterOperation = pmLog.DataAfterOperation;
                pmLogDetail.DataBeforeOperation = pmLog.DataBeforeOperation;
                pmLogDetail.LogId = ent.Id;
                LogDetail(pmLogDetail);
            }
        }

        public void LogDetail(PmLogDetail pmLogDetail)
        {
            var ent = BringNewLogDetail();
            ent.DataBeforeOperation = pmLogDetail.DataBeforeOperation;
            ent.DataAfterOperation = pmLogDetail.DataAfterOperation;
            ent.LogId = pmLogDetail.LogId;

            _context.LogDetails.Add(ent);
            _context.SaveChanges();
        }

        public void LogError(PmLogError pmLogError)
        {
            var ent = BringNewError();
            ent.FunctionName = pmLogError.FunctionName;
            ent.ErrorMessage = pmLogError.ErrorMessage;
            ent.StackTrace = pmLogError.StackTrace;
            ent.DateOccured = DateTime.UtcNow;
            ent.ClassName = pmLogError.ClassName;
            _context.LogErrors.Add(ent);
            _context.SaveChanges();
        }
        public Log BringNewLog(decimal? id = null)
        {
            if (id.HasValue)
            {
                return _context.Logs.Find(id);
            }
            return new Log();
        }
        public LogDetail BringNewLogDetail(decimal? id = null)
        {
            if (id.HasValue)
            {
                return _context.LogDetails.Find(id);
            }
            return new LogDetail();
        }
        public LogError BringNewError(decimal? id = null)
        {
            if (id.HasValue)
            {
                return _context.LogErrors.Find(id);
            }
            return new LogError();
        }

    }
}
