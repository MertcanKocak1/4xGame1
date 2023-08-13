namespace DTO.Results
{
    public class RsUser : BaseDTO
    {
        public string UserName { get; set; }
        public string PasswordHash { get; set; }
        public string Email { get; set; }

    }
}
