﻿namespace DTO.Results
{
    public class RsLogError
    {
        public int? Id { get; set; }
        public string? FunctionName { get; set; }
        public string? ErrorMessage { get; set; }
        public string? StackTrace { get; set; }
        public DateTime? DateOccured { get; set; }
        public string ClassName { get; set; }

    }
}
