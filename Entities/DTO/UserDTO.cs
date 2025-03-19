using Entities.DTO;

public class UserDTO
{
    public int UserId { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Password { get; set; } = null!;

    public int UserTypesId { get; set; }

    public bool IsActive { get; set; }

    public string? Role { get; set; }

    public string UserTypesName { get; set; } = null!; 

    public virtual UserTypesDTO UserTypes { get; set; } = null!;
}
