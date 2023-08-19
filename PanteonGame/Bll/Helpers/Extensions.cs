using System.Text.Json;

public static class Extensions
{
    public static string ToJson(this object obj)
    {
        if (obj == null)
            return null;

        return JsonSerializer.Serialize(obj);
    }
}
