using System.ComponentModel.DataAnnotations;

namespace MyProjectAPI.Models
{
    public class Role
    {
        [Key]
        public int Id { get; set; } // Unique identifier for the role
        public string Name { get; set; } // Name of the role (e.g., "Admin", "User")

    }
}
