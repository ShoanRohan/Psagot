using System.ComponentModel.DataAnnotations;

namespace Entities.DTO
{
    public class RoomDTO
    {
        public int RoomId { get; set; }

        [Required(ErrorMessage = "שם החדר חובה.")]
        [StringLength(100, ErrorMessage = "שם החדר לא יכול להכיל יותר מ-100 תווים.")]
        public string Name { get; set; } = null!;

        public bool Projector { get; set; }

        public bool Computers { get; set; }

        public bool Speakers { get; set; }

        [Range(1, 500, ErrorMessage = "הקיבולת חייבת להיות בין 1 ל-500.")]
        public int Capacity { get; set; }
    }
}
