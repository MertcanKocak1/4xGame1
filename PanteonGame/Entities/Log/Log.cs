using System.ComponentModel.DataAnnotations;

namespace Entities.Log
{
    public class Log
    {
        [Key]
        public int Id { get; set; }
        public string? ClassName { get; set; }
        public string? Message { get; set; }
        public DateTime DateCreated { get; set; }
        public string? MethodName { get; set; }
    }
}
