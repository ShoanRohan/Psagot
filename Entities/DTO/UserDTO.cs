using Entities.DTO;

public class UserDTO
{
    public int UserId { get; set; }

    public string Name { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Password { get; set; } = null!;

    public int UserTypeId { get; set; }

        
        public string UserTypeName { get; set; } = null!;

        public bool IsActive { get; set; }

    public string? Role { get; set; }


    public virtual UserTypeDTO UserType { get; set; } = null!;
}
