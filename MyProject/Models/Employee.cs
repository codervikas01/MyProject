namespace MyProject.Models
{
    public class Employee
    {
        public int employeeId { get; set; } 
        public string? firstName { get; set; }
        public string? lastName { get; set; } 
        public string? email { get; set; } 
        public string? phoneNumber { get; set; } 
        public DateTime dateOfBirth { get; set; }
        public string? address { get; set; } 
        public DateTime hireDate { get; set; } 
        public string? department { get; set; }
        public decimal salary { get; set; } 
        public bool asActive { get; set; } 

    }
}
