using RegionalAnimalHealth.Application.Common.Interfaces;

namespace WebUI.Services;

public class HostingEnvironmentService : IHostingEnvironmentService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public HostingEnvironmentService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public string BaseUrl => $"{_httpContextAccessor?.HttpContext?.Request.Scheme}://{_httpContextAccessor?.HttpContext?.Request.Host.Value}/";
}
