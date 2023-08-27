using PanteonGame;
DynamicLogger.WriteLog("Uygulama Baþladý. 4 ");

var builder = WebApplication.CreateBuilder(args);
DynamicLogger.WriteLog("Uygulama Baþladý. 7");
#if !DEBUG
builder.WebHost.UseUrls("https://api.mertcankocak.com");
#endif
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

IConfiguration configuration = builder.Configuration;
var startup = new Startup(configuration);
startup.ConfigureServices(builder.Services);
DynamicLogger.WriteLog("Uygulama Baþladý. 16");

var app = builder.Build();

var logger = app.Services.GetRequiredService<ILogger<Program>>();
try
{
    startup.Configure(app, app.Environment);

    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }
    app.UseHttpsRedirection();
    app.UseAuthorization();
    app.MapControllers();
    app.Run();
}
catch (Exception ex)
{
    DynamicLogger.WriteLog("Uygulama Hatada 38. " + ex.Message + " ::: " + ex?.InnerException);
}
