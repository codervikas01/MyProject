using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyProjectAPI.BL;
using MyProjectAPI.Models;

namespace MyProjectAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
            public EmployeeBL EmployeeBL;
            public EmployeeController(EmployeeBL employeeBL)
            {
                EmployeeBL = employeeBL;
            }

        [Route("Emplist")]
        [HttpGet]
        public IActionResult Index()
        {
            try
            {
                List<Employee> emplist = EmployeeBL.EmpList();
                return Ok(emplist);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Route("EmpCreate")]
        [HttpPost]
        public IActionResult Create([FromBody] Employee employee)
        {
            try
            {
                var Message = EmployeeBL.Create(employee);
                return Ok(Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [Route("GetEmpById")]
        [HttpGet]
        public IActionResult GetEmp(int id)
        {
            try
            {
                Employee? employee = EmployeeBL.GetEmp(id);
                return Ok(employee);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [Route("EmpUpdate")]
        [HttpPost]

        public IActionResult EmpUpdate(Employee emp)
        {
            try
            {
                string message= EmployeeBL.EmpUpdate(emp);
                return Ok(message); 
            }
            catch (Exception ex) { 
                return BadRequest(ex.Message);
            }
        }

        [Route("EmpDelete")]
        [HttpDelete]
        public IActionResult EmpDelete(int id)
        {
            try
            {
                string message = EmployeeBL.EmpDelete(id);
                return Ok(message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

    }
}
