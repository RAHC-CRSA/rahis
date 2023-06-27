﻿namespace RegionalAnimalHealth.Application.Common.Models.Personas;
public class UserDto
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public List<string> Roles { get; set; }
}
