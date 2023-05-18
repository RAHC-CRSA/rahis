using CommunityToolkit.Diagnostics;
using Newtonsoft.Json;

namespace RegionalAnimalHealth.Domain.Models.Messaging;
public class ActionNotification : EmailNotification
{
    public static new string TemplateId = "d-c2dc195c49fe4a06a94a401049be2288";

    [JsonProperty("additional_content")]
    public string? AdditionalContent { get; private set; }
    [JsonProperty("action")]
    public EmailAction? Action { get; private set; }

    private ActionNotification() : base()
    {
    }

    private ActionNotification(string content, string to, string? subject, string? name, string actionText, string actionUrl, string additionalContent) : base(content, to, subject, name)
    {
        AdditionalContent = string.IsNullOrEmpty(additionalContent) ? additionalContent: null;
        if (actionText != null)
        {
            Action = new EmailAction
            {
                Text = actionText,
                Url = actionUrl
            };
        }
    }

    public static ActionNotification Create(string content, string to, string? subject = null, string? name = null, string? actionText = null, string? actionUrl = null, string? additionalContent = null)
    {
        Guard.IsNotNullOrEmpty(to, nameof(to));
        Guard.IsNotNullOrEmpty(subject, nameof(subject));
        Guard.IsNotNullOrEmpty(content, nameof(content));

        if (actionText != null || actionUrl != null)
        {
            Guard.IsNotNullOrEmpty(actionText, nameof(actionText));
            Guard.IsNotNullOrEmpty(actionUrl, nameof(actionUrl));
        }

        return new ActionNotification(content, to, subject, name, actionText, actionUrl, additionalContent);
    }
}

public class EmailAction
{
    [JsonProperty("text")]
    public string Text { get; set; }
    [JsonProperty("url")]
    public string Url { get; set; }
}
