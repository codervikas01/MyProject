using Microsoft.AspNetCore.Mvc;
using MyProject.Models;
using System.Text;
using System.Text.Json;

namespace MyProject.Controllers
{
    public class EmployeeController : Controller
    {
        readonly IConfiguration _configuration;
        HttpClient _client;
        public EmployeeController(IConfiguration configuration)
        {
            _configuration = configuration;
            _client = new HttpClient()
            {
                BaseAddress = new Uri(_configuration["APIUrl"] + "Employee/")
            };

        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult Empdetals()
        {
            List<Employee>? employees = new List<Employee>();
            HttpResponseMessage httpResponseMessage = _client.GetAsync(_client.BaseAddress + "Emplist").Result;
            if (httpResponseMessage.IsSuccessStatusCode)
            {
                string content = httpResponseMessage.Content.ReadAsStringAsync().Result;
                var empList = JsonSerializer.Deserialize<List<Employee>>(content);
                if (empList != null)
                {
                    foreach (var emp in empList)
                    {
                        Employee employee = new Employee();
                        employee.employeeId = emp.employeeId;
                        employee.firstName = emp.firstName;
                        employee.lastName = emp.lastName;
                        employee.email = emp.email;
                        employee.phoneNumber = emp.phoneNumber;
                        employee.dateOfBirth = emp.dateOfBirth;
                        employee.address = emp.address;
                        employee.department = emp.department;
                        employee.salary = emp.salary;

                        employees.Add(employee);
                    }
                }
                return new JsonResult(employees);
            }
            else
            {
                return new JsonResult(employees);
            }

        }

        [HttpPost]
        public JsonResult AddEmployee(Employee employee)
        {
            if (employee != null)
            {
                string data = JsonSerializer.Serialize(employee);
                StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
                HttpResponseMessage httpResponseMessage = _client.PostAsync(_client.BaseAddress + "EmpCreate", content).Result;
                if (httpResponseMessage.IsSuccessStatusCode)
                {
                    return new JsonResult("0");
                }
                else
                {
                    return new JsonResult("1");
                }
            }
            return new JsonResult("2");
        }
        [HttpPost]
        public JsonResult UpdateEmployee(Employee employee)
        {
            if (employee != null)
            {
                string data = JsonSerializer.Serialize(employee);
                StringContent content = new StringContent(data, Encoding.UTF8, "application/json");
                HttpResponseMessage httpResponseMessage = _client.PostAsync(_client.BaseAddress + "EmpUpdate", content).Result;
                if (httpResponseMessage.IsSuccessStatusCode)
                {
                    return new JsonResult(employee);
                }
                else
                {
                    return new JsonResult("1");
                }
            }
            return new JsonResult("2");
        }

        public JsonResult DeleteEmployee(int id)
        {
            HttpResponseMessage httpResponseMessage = _client.DeleteAsync(_client.BaseAddress + "EmpDelete?id=" + id).Result;
            if (httpResponseMessage.IsSuccessStatusCode)
            {

                return new JsonResult("0");

            }
            else { return new JsonResult("1"); }

        }

        public JsonResult GetEmpById(int id)
        {
            Employee? employee = new Employee();
            HttpResponseMessage httpResponseMessage = _client.GetAsync(_client.BaseAddress + "GetEmpById?id=" + id).Result;

            if (httpResponseMessage.IsSuccessStatusCode)
            {
                string content = httpResponseMessage.Content.ReadAsStringAsync().Result;
                employee = JsonSerializer.Deserialize<Employee>(content);
                return new JsonResult(employee);
            }
            else
            {
                return new JsonResult("1");
            }

        }
    }
}
