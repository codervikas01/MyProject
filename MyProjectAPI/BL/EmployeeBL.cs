using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyProjectAPI.Models;

namespace MyProjectAPI.BL
{
    public class EmployeeBL
    {
        public MyDbContext Context;
        public EmployeeBL(MyDbContext context)
        {
            Context = context;

        }

        public List<Employee> EmpList()
        {
            List<Employee> emplist = Context.Employees.Where(x => x.IsActive == true).ToList();
            return emplist;

        }

        public string Create(Employee employee)
        {
            Context.Employees.Add(employee);
            var count = Context.SaveChanges();
            if (count > 0)
            {
                return "Succes";
            }
            else
            {
                return "fail";
            }
        }
        public Employee? GetEmp(int id)
        {
            Employee? employee = Context.Employees.Find(id);
            if (employee != null)
            {
                return (employee);

            }
            return (employee);
        }

        public string EmpUpdate(Employee employee)
        {
            Context.Employees.Update(employee);
            var count = Context.SaveChanges();
            if (count > 0)
            {
                return "Succes";
            }
            else
            {
                return "fail";
            }
        }

        public string EmpDelete(int id)
        {
            var emp = Context.Employees.Find(id);
            if (emp != null)
            {
                Context.Entry(emp).State = EntityState.Detached;
                Employee employee = new Employee()
                {
                    EmployeeId = emp.EmployeeId,
                    FirstName = emp.FirstName,
                    LastName = emp.LastName,
                    Email = emp.Email,
                    PhoneNumber = emp.PhoneNumber,
                    DateOfBirth = emp.DateOfBirth,
                    Address = emp.Address,
                    HireDate = emp.HireDate,
                    Salary = emp.Salary,
                    Department = emp.Department,
                    IsActive = false
                };
                Context.Entry(employee).State = EntityState.Modified;
                var count = Context.SaveChanges();
                if (count > 0)
                {
                    return "Succes";
                }
            }
            return "fail";
        }

    }
}
