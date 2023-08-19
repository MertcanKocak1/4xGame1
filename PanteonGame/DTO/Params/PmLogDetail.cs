namespace DTO.Params
{
    public class PmLogDetail
    {
        public int Id { get; set; }
        public int LogId { get; set; }
        public string? DataBeforeOperation { get; set; }
        public string? DataAfterOperation { get; set; }

    }
}
