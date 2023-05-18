using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using RegionalAnimalHealth.Application.Common.Security.Configurations;
using RegionalAnimalHealth.Application.Common.Models.Authorization;
using RegionalAnimalHealth.Application.Contracts.Users.Queries.GetUsers;
using RegionalAnimalHealth.Application.Common.Models.Personas;

namespace RegionalAnimalHealth.Infrastructure.Identity;

public class IdentityService : IIdentityService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IUserClaimsPrincipalFactory<ApplicationUser> _userClaimsPrincipalFactory;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IAuthorizationService _authorizationService;
    private readonly AuthorizationConfiguration _authConfiguration;

    public IdentityService(
        UserManager<ApplicationUser> userManager,
        IUserClaimsPrincipalFactory<ApplicationUser> userClaimsPrincipalFactory,
        SignInManager<ApplicationUser> signInManager, RoleManager<IdentityRole> roleManager,
        IAuthorizationService authorizationService, AuthorizationConfiguration authConfiguration)
    {
        _userManager = userManager;
        _userClaimsPrincipalFactory = userClaimsPrincipalFactory;
        _signInManager = signInManager;
        _roleManager = roleManager;
        _authorizationService = authorizationService;
        _authConfiguration = authConfiguration;
    }

    public async Task<string?> GetUserNameAsync(string userId)
    {
        var user = await _userManager.Users.FirstAsync(u => u.Id == userId);

        return user.UserName;
    }

    public async Task<(Result Result, string UserId)> CreateUserAsync(string userName, string password, string firstName, string lastName)
    {
        var user = new ApplicationUser
        {
            FirstName = firstName,
            LastName = lastName,
            UserName = userName,
            Email = userName,
        };

        var result = await _userManager.CreateAsync(user, password);

        return (result.ToApplicationResult(), user.Id);
    }

    public async Task<bool> IsInRoleAsync(string userId, string role)
    {
        var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

        return user != null && await _userManager.IsInRoleAsync(user, role);
    }

    public async Task<bool> AuthorizeAsync(string userId, string policyName)
    {
        var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

        if (user == null)
        {
            return false;
        }

        var principal = await _userClaimsPrincipalFactory.CreateAsync(user);

        var result = await _authorizationService.AuthorizeAsync(principal, policyName);

        return result.Succeeded;
    }

    public async Task<Result> DeleteUserAsync(string userId)
    {
        var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

        return user != null ? await DeleteUserAsync(user) : Result.Success();
    }

    public async Task<Result> DeleteUserAsync(ApplicationUser user)
    {
        var result = await _userManager.DeleteAsync(user);

        return result.ToApplicationResult();
    }

    public async Task<Result> SignInAsync(string userName, string password)
    {
        var result = await _signInManager.PasswordSignInAsync(userName?.Trim(), password, false, false);

        return result.Succeeded ? Result.Success() : Result.Failure(new List<string>()
        {
            $"Unable to sign you in. Please ensure you have entered the correct username and password"
        });
    }

    public async Task<AuthResponseDto> GetTokenAsync(string userName)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_authConfiguration.Secret);
        var user = await _userManager.FindByNameAsync(userName);
        var roles = await _userManager.GetRolesAsync(user);
        var claims = new List<Claim> { new Claim(ClaimTypes.Name, userName), new Claim(ClaimTypes.NameIdentifier, user.Id) };

        claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims.ToArray()),
            Expires = DateTime.UtcNow.AddMinutes(_authConfiguration.ExpirationInMinutes),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return new AuthResponseDto()
        {
            Username = user.UserName,
            Email = user.Email,
            AppUserId = user.Id,
            AuthToken = tokenHandler.WriteToken(token),
            Roles = roles.ToList()
        };
    }

    public async Task<List<string>> GetRolesAsync(string userName)
    {
        var user = await _userManager.FindByNameAsync(userName);
        return user == null ? new List<string>() : (await _userManager.GetRolesAsync(user)).ToList();
    }

    public async Task<List<string>> GetAvailableRolesAsync()
    {
        return (await _roleManager.Roles.ToListAsync()).Select(r => r.Name).ToList();
    }

    public async Task<Result> AddUserToRoles(string userId, List<string> roles)
    {
        var user = await _userManager.Users.SingleOrDefaultAsync(u => u.Id == userId);
        if (user == null) return Result.Failure(new List<string>() { "User not found" });

        var result = await _userManager.AddToRolesAsync(user, roles);

        return result.ToApplicationResult();
    }

    public async Task<(Result, UserDto?)> GetUserAsync(string userId)
    {
        var user = await _userManager.Users.SingleOrDefaultAsync(u => u.Id == userId);
        if (user == null) return (Result.Failure(new List<string>() { "User not found" }), null);

        var roles = await _userManager.GetRolesAsync(user);

        var userDto = new UserDto
        {
            Name = $"{user.FirstName} {user.LastName}",
            Email = user.Email,
            UserName = user.UserName,
            Roles = roles.Count > 0 ? roles.ToList() : new List<string>()
        };

        return (Result.Success(), userDto);
    }

}
