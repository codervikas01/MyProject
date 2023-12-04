using Microsoft.AspNetCore.Mvc;
using MyProject.Models;
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
                employees = JsonSerializer.Deserialize<List<Employee>>(content);
                return new JsonResult(employees);

            }
            else
            {
                return new JsonResult(employees);
            }

        }
    }
}
