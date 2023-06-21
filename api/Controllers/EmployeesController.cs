using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class EmployeesController : Controller
    {
        private readonly AppDbContext _appDbContext;

        public EmployeesController(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetEmployees()
        {
         var employees =  await _appDbContext.Employees.ToListAsync();

            return Ok(employees);
        }

        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromBody] Employee employeeRequest) 
        {
            employeeRequest.id = Guid.NewGuid();

           await  _appDbContext.Employees.AddAsync(employeeRequest);
           await _appDbContext.SaveChangesAsync();

            return Ok(employeeRequest);
        }

        [HttpGet]
        [Route("{id:guid}")]
        public async Task<IActionResult> GetEmployeeById(Guid id) {

          var employee = await _appDbContext.Employees.FirstOrDefaultAsync(emp => emp.id == id);

            if (employee is null)
                return NotFound();


            return Ok(employee);
        }

        [HttpPut]
        [Route("{id:guid}")]
        public async Task<IActionResult> UpdateEmployee(Guid id, [FromBody] Employee updateEmployeeRequest) 
        {
            var employee = await _appDbContext.Employees.FindAsync(id);
            if (employee is null) {
                return NotFound();
            }
            employee.Name = updateEmployeeRequest.Name;
            employee.Email = updateEmployeeRequest.Email;
            employee.Salary = updateEmployeeRequest.Salary;
            employee.Department = updateEmployeeRequest.Department;
            employee.Phone = updateEmployeeRequest.Phone;

            await _appDbContext.SaveChangesAsync();

            return Ok(employee);
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public async Task<IActionResult> DeleteEmployee(Guid id)
        {
            var employee = await _appDbContext.Employees.FindAsync(id);
            if (employee is null)
            {
                return NotFound();
            }

            _appDbContext.Employees.Remove(employee);

            await _appDbContext.SaveChangesAsync();

            return Ok(employee);
        }
    }
}
