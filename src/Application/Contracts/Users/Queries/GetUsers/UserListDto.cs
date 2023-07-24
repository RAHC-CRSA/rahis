namespace RegionalAnimalHealth.Application.Contracts.Users.Queries.GetUsers;
public class UserListDto
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Roles { get; set; }
    public string Country { get; set; }
    public string CountryFlag { get; set; }
}
