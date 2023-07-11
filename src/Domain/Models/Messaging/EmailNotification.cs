using CommunityToolkit.Diagnostics;
using Newtonsoft.Json;

namespace RegionalAnimalHealth.Domain.Models.Messaging;
public class EmailNotification
{
    public static string TemplateId = "d-a2f64a2491bc4f1989ec60e670119a84";

    [JsonProperty("content")]
    public string Content { get; private set; }
    [JsonProperty("subject")]
    public string? Subject { get; private set; }
    [JsonProperty("to")]
    public string To { get; private set; }
    [JsonProperty("name")]
    public string? Name { get; private set; }

    protected EmailNotification()
    {
    }

    protected EmailNotification(string content, string to, string? subject, string? name) : this()
    {
        Content = content;
        To = to;
        Subject = subject;
        Name = name;
    }

    public static EmailNotification Create(string content, string to, string? subject = null, string? name = null)
    {
        Guard.IsNotNullOrEmpty(to, nameof(to));
        Guard.IsNotNullOrEmpty(content, nameof(content));

        return new EmailNotification(content, to, subject, name);
    }
}
