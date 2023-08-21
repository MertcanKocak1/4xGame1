namespace DTO.Params
{
    public class PmUser : BaseDTO
    {
        public string UserName { get; set; }
        public string PasswordHash { get; set; }
        public string? Email { get; set; }
        public string? JwtToken { get; set; }

    }
}
