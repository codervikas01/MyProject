using System.ComponentModel.DataAnnotations;

namespace MyProjectAPI.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; } // Unique identifier for the user
        public string FirstName { get; set; } // User's first name
        public string LastName { get; set; } // User's last name
        public string UserName { get; set; } // User's username or login name
        public string Email { get; set; } // User's email address
        public DateTime DateOfBirth { get; set; } // User's date of birth
        public string PhoneNumber { get; set; } // User's phone number
        public string Address { get; set; } // User's address
        public string ProfilePictureUrl { get; set; } = string.Empty;// URL to the user's profile picture
        public DateTime RegistrationDate { get; set; } // Date when the user registered
        public string PasswordHash { get; set; } // Hashed password
        public bool IsActive { get; set; }
    }
}
