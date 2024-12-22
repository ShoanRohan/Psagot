namespace Psagot.Models
{
    public class CreateUserRequest
    {
        public string Name { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string Phone { get; set; } = null!;

        public string Password { get; set; } = null!;

        public int UserTypeId { get; set; }

        public bool IsActive { get; set; }


    }
}
