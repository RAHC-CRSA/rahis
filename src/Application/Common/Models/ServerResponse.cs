namespace RegionalAnimalHealth.Application.Common.Models;
public class ServerResponse
{
    public string Summary => string.Join(", ", Errors);
    public List<string> Errors { get; private set; }
    public bool IsError { get; private set; }

    public ServerResponse()
    {
        IsError = IsError;
    }

    public ServerResponse(IEnumerable<string> errors, bool isError = true) : this()
    {
        Errors = errors.ToList();
        IsError = isError;
    }

    public ServerResponse(string error, bool isError = true) : this()
    {
        Errors = new() { error };
        IsError = isError;
    }
}
