using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Identity;
namespace BusinessLayer.Abstract
{
    public interface IJwtService
    {
        public string GenerateJwtToken(IdentityUser user);
    }
}
