using NSwag.Annotations;
using System.ComponentModel.DataAnnotations;

namespace MyProjectAPI.Models
{
    public class Employee
    {
        [Key]
        public int EmployeeId { get; set; } // Unique identifier for the employee
        public string? FirstName { get; set; } // Employee's first name
        public string? LastName { get; set; } // Employee's last name
        public string? Email { get; set; } // Employee's email address
        public string? PhoneNumber { get; set; } // Employee's phone number
        public DateTime DateOfBirth { get; set; } // Employee's date of birth
        public string? Address { get; set; } // Employee's address
        public DateTime HireDate { get; set; } // Date when the employee was hired
        public string? Department { get; set; } // Employee's department or team
        public decimal Salary { get; set; } // Employee's salary
        public bool IsActive { get; set; } // Indicates if the employee is currently active

    }
}
