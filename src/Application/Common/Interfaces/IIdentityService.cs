using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Authorization;
using RegionalAnimalHealth.Application.Common.Models.Personas;

namespace RegionalAnimalHealth.Application.Common.Interfaces;

public interface IIdentityService
{
    Task<string?> GetUserNameAsync(string userId);

    Task<bool> IsInRoleAsync(string userId, string role);

    Task<bool> AuthorizeAsync(string userId, string policyName);

    Task<(Result Result, string UserId)> CreateUserAsync(string userName, string password, string firstName, string lastName, long countryId);

    Task<Result> SignInAsync(string userName, string password);

    Task<Result> DeleteUserAsync(string userId);

    Task<AuthResponseDto> GetTokenAsync(string userName);

    Task<List<string>> GetRolesAsync(string userName);

    Task<List<string>> GetAvailableRolesAsync();

    Task<Result> AddUserToRoles(string userId, List<string> roles);

    Task<(Result, UserDto?)> GetUserAsync(string userId);

    Task<(Result, string?)> CreatePasswordResetTokenAsync(string email);

    Task<Result> UpdatePasswordAsync(string email, string password, string resetToken);
}
