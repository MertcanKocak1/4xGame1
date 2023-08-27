using BusinessLayer.Abstract;
using DTO.Params;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly SignInManager<IdentityUser> _signInManager;
    private readonly IJwtService _jwtService;
    private readonly ILogService _logService;

    public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, IJwtService jwtService, ILogService logService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _jwtService = jwtService;
        _logService = logService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] PmUser model)
    {
        try
        {
            _logService.LogError(new PmLogError { ClassName = "AccountController", MethodName = nameof(Login), ErrorMessage = "mertcan", StackTrace = "Sekan İs MY GİRL"});
            DynamicLogger.WriteLog("Logine Girdi : 28. Satır");
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByNameAsync(model.UserName);
                if (user != null)
                {
                    var result = await _signInManager.PasswordSignInAsync(user, model.PasswordHash, false, false);
                    if (result.Succeeded)
                    {
                        var token = _jwtService.GenerateJwtToken(user);
                        return Ok(new { Token = token, Message = "Login Successful." });
                    }
                }

                ModelState.AddModelError(string.Empty, "Invalid Login Attempt.");
            }
            DynamicLogger.WriteLog("Logine Girdi : 44. Satır");
            return BadRequest(ModelState);
        }
        catch (Exception ex)
        {
            DynamicLogger.WriteLog("Login Catch Girdi : 49. Satır" + ex.Message);
            _logService.LogError(new PmLogError { ClassName = "AccountController", MethodName = nameof(Login), ErrorMessage = ex.Message, StackTrace = ex.StackTrace });
            return BadRequest();
        }
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] PmUser model)
    {
        try
        {
            DynamicLogger.WriteLog("Registera Girdi : 60. Satır");
            if (ModelState.IsValid)
            {
                var user = new IdentityUser { UserName = model.UserName, Email = model.Email };
                var result = await _userManager.CreateAsync(user, model.PasswordHash);

                if (result.Succeeded)
                {
                    return Ok(new { Message = "User Created Successfully." });
                }
                DynamicLogger.WriteLog("Registera Girdi : 70. Satır");

                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
            }
            DynamicLogger.WriteLog("Registera Girdi : 77. Satır");

            return BadRequest(ModelState);
        }
        catch (Exception ex)
        {
            DynamicLogger.WriteLog("Registera Girdi : 83. Satır" + ex.Message);

            _logService.LogError(new PmLogError { ClassName = "AccountController", MethodName = nameof(Register), ErrorMessage = ex.Message, StackTrace = ex.StackTrace });
            return BadRequest();
        }
    }

}
