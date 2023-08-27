using System;
using System.IO;

public static class DynamicLogger
{
    private static readonly string _baseDirectory;
    private static readonly string _logFile;

    static DynamicLogger()
    {
        try
        {
            // temp niye çalışmadı sunucuda? 
            _baseDirectory = @"C:\Program Files (x86)\Application\PantheonGame\logs";

            if (!Directory.Exists(_baseDirectory))
            {
                Directory.CreateDirectory(_baseDirectory);
            }

            _logFile = Path.Combine(_baseDirectory, $"appLog_{DateTime.UtcNow:yyyy_MM_dd}.txt");

            if (!File.Exists(_logFile))
            {
                File.Create(_logFile).Dispose();
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Bir hata meydana geldi: {ex.Message}");
        }
    }


    public static void WriteLog(string message)
    {
        string formattedMessage = $"{DateTime.UtcNow:yyyy-MM-dd HH:mm:ss.fff} - {message}";
#if !DEBUG
        using (StreamWriter writer = new StreamWriter(_logFile, append: true))
        {
            writer.WriteLine(formattedMessage);
        }
#endif
    }

}
