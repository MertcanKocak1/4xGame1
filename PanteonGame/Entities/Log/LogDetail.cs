using System.ComponentModel.DataAnnotations;

namespace Entities.Log
{
    public class LogDetail
    {
        [Key]
        public int Id { get; set; }
        public int LogId { get; set; }
        public string? DataBeforeOperation { get; set; }
        public string? DataAfterOperation { get; set; }
    }
}
