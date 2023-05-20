namespace RegionalAnimalHealth.Application.Common.Models;
public class ErrorResponse
{
    public string Summary => string.Join(", ", Errors);
    public List<string> Errors { get; private set; }

    public ErrorResponse()
    {
    }

    public ErrorResponse(IEnumerable<string> errors) : this()
    {
        Errors = errors.ToList();
    }

    public ErrorResponse(string error) : this()
    {
        Errors = new() { error };
    }
}
