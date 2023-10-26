using Microsoft.AspNetCore.Mvc;
using MyProject.Models;
using System.Text.Json;

namespace MyProject.Controllers
{
    public class EmployeeController : Controller
    {
        HttpClient client = new HttpClient()
        {
            BaseAddress = new Uri("https://localhost:44384/api/Employee/")
        };
        public IActionResult Index()
        {
            return View();
        }

        public JsonResult Empdetals()
        {
            List<Employee>? employees = new List<Employee>();
            HttpResponseMessage httpResponseMessage = client.GetAsync(client.BaseAddress + "Emplist").Result;
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
