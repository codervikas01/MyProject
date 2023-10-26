using System.ComponentModel.DataAnnotations;
using System.Data;

namespace MyProjectAPI.Models
{
    public class UserRole
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; } // User's ID
        public User User { get; set; } // Navigation property to the user

        public int RoleId { get; set; } // Role's ID
        public Role Role { get; set; } // Navigation property to the role

    }
}
