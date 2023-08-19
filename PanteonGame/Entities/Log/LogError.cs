using System.ComponentModel.DataAnnotations;

namespace Entities.Log
{
    public class LogError
    {
        [Key]
        public int Id { get; set; }
        public string? FunctionName { get; set; }
        public string? ErrorMessage { get; set; }
        public string? StackTrace { get; set; }
        public DateTime DateOccured { get; set; }
        public string ClassName { get; set; }
        public string? MethodName { get; set; }

    }
}
