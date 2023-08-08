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
using static Duende.IdentityServer.Models.IdentityResources;

namespace RegionalAnimalHealth.Infrastructure.Identity;

public class IdentityService : IIdentityService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IApplicationDbContext _context;
    private readonly IUserClaimsPrincipalFactory<ApplicationUser> _userClaimsPrincipalFactory;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly IAuthorizationService _authorizationService;
    private readonly AuthorizationConfiguration _authConfiguration;

    public IdentityService(
        UserManager<ApplicationUser> userManager,
        IApplicationDbContext context,
        IUserClaimsPrincipalFactory<ApplicationUser> userClaimsPrincipalFactory,
        SignInManager<ApplicationUser> signInManager, RoleManager<IdentityRole> roleManager,
        IAuthorizationService authorizationService, AuthorizationConfiguration authConfiguration)
    {
        _userManager = userManager;
        _context = context;
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

    public async Task<(Result Result, string UserId)> CreateUserAsync(string userName, string password, string firstName, string lastName, long countryId)
    {
        var user = new ApplicationUser
        {
            FirstName = firstName,
            LastName = lastName,
            UserName = userName,
            Email = userName,
            CountryId = countryId
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
        try
        {
            var result = await _signInManager.PasswordSignInAsync(userName?.Trim(), password, false, false);

            return result.Succeeded ? Result.Success() : Result.Failure(new List<string>()
        {
            $"Unable to sign you in. Please ensure you have entered the correct username and password."
        });
        } 
        catch(Exception ex)
        {
            return Result.Failure(new List<string> { ex.Message });
        }
    }

    public async Task<Result> UpdatePasswordAsync(string userId, string newPassword)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
                return Result.Failure(new List<string> { "User not found." });

            var result = await _userManager.AddPasswordAsync(user, newPassword);
            if (!result.Succeeded)
            {
                return Result.Failure(result.Errors.Select(r => r.Description).ToList());
            }

            return Result.Success();

        }
        catch (Exception ex)
        {
            return Result.Failure(new List<string> { ex.Message });
        }
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

        var country = await _context.Countries.Where(x => !x.IsDeleted && x.Id == user.CountryId).FirstOrDefaultAsync();

        return new AuthResponseDto()
        {
            Username = user.UserName,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            AppUserId = user.Id,
            CountryId = user.CountryId,
            CountryName = country?.Name,
            CountryFlag = country?.Flag,
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
        return (await _roleManager.Roles.ToListAsync())?.Select(r => r.Name).ToList();
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
            FirstName = user.FirstName,
            LastName = user.LastName,
            Name = $"{user.FirstName} {user.LastName}",
            Email = user.Email,
            UserName = user.UserName,
            Roles = roles.Count > 0 ? roles.ToList() : new List<string>()
        };

        return (Result.Success(), userDto);
    }

    public async Task<(Result, string?)> CreatePasswordResetTokenAsync(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);

        if (user == null)
            return (Result.Failure(new List<string> { "User not found." }), null);

        var resetToken = GenerateRandomString(8);

        user.PasswordResetToken = resetToken;
        user.PasswordResetTokenExpiry = DateTime.UtcNow.AddMinutes(15);

        var result = await _userManager.UpdateAsync(user);
        if (!result.Succeeded)
        {
            return (Result.Failure(result.Errors.Select(r => r.Description).ToList()), null);
        }

        return (Result.Success(), resetToken);
    }

    public async Task<Result> UpdatePasswordAsync(string email, string newPassword, string resetToken)
    {
        var user = await _userManager.Users.Where(x => x.Email == email &&  x.PasswordResetToken == resetToken && x.PasswordResetTokenExpiry <= DateTime.UtcNow.AddMinutes(15)).FirstOrDefaultAsync();

        if (user == null)
            return Result.Failure(new List<string> { "User not found." });

        await _userManager.RemovePasswordAsync(user);
        var result = await _userManager.AddPasswordAsync(user, newPassword);
        if (!result.Succeeded)
        {
            return Result.Failure(result.Errors.Select(r => r.Description).ToList());
        }

        return Result.Success();
    } 

    private string GenerateRandomString(int length)
    {
        var random = new Random();
        const string pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        var chars = Enumerable.Range(0, length).Select(x => pool[random.Next(0, pool.Length)]);

        return new string(chars.ToArray());
    }
         
}
