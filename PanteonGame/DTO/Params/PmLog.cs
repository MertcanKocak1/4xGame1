namespace DTO.Params
{
    public class PmLog
    {
        public int? Id { get; set; }
        public string? ClassName { get; set; }
        public string? Message { get; set; }
        public DateTime? DateCreated { get; set; }
        public string? DataBeforeOperation { get; set; }
        public string? DataAfterOperation { get; set; }
        public string? MethodName { get; set; }

    }
}
