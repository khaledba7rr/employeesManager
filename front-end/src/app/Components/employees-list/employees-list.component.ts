import { Component } from '@angular/core';
import { Employee } from 'src/Models/employees.model';
import { EmployeeService } from 'src/app/Services/employees.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent {
  employees: Employee [] = [];

  constructor(private employeesService : EmployeeService) {
    this.employeesService.GetAllEmployees().subscribe({
      next : (employees) => {
        this.employees = employees;
      },
       error : (response) => {
        console.log(response);
       }
    });
  }
}
