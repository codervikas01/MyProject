using Microsoft.EntityFrameworkCore;

namespace MyProjectAPI.Models
{
    public class MyDbContext : DbContext
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options)
        {

        }

        public DbSet<Employee> Employees { get; set;}
        public DbSet<User> Users { get; set;}
        public DbSet<Role> Roles { get; set;}
        public DbSet<UserRole> UserRole { get; set;} 

    }
}
