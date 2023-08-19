using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Entities.Log;

public class AppDbContext : IdentityDbContext<IdentityUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }
    public DbSet<Log> Logs { get; set; }
    public DbSet<LogError> LogErrors { get; set; }
    public DbSet<LogDetail> LogDetails { get; set; }
}