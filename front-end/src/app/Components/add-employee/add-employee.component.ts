import { Component } from '@angular/core';
import {FormGroup, FormControl, Validators, NgForm} from '@angular/forms';
import { Router } from '@angular/router';

import { Employee } from 'src/Models/employees.model';
import { EmployeeService } from 'src/app/Services/employees.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent {
  form: any;
  constructor(private employeeService: EmployeeService, private router:Router) {
    this.form = new FormGroup({
      name : new FormControl('', [Validators.required, Validators.minLength(6)]),
      email : new FormControl('', [Validators.required, Validators.email]),
      phone : new FormControl ('', Validators.required ),
      salary : new FormControl('', Validators.required),
      department : new FormControl('', Validators.required),
    });
  }

  get name () {
    return this.form.get("name");
  }

  get email () {
    return this.form.get('email');
  }

  get phone () {
    return this.form.get('phone');
  }

  get salary () {
    return this.form.get('salary');
  }

  get department () {
    return this.form.get('department');
  }

  addEmployee(){
    let values = this.form.value;
    let employeeAddRequest : Employee = {
      id : "00000000-0000-0000-0000-000000000000",
      name : values.name,
      department : values.department,
      email : values.email,
      phone : values.phone,
      salary: values.salary
    };

    this.employeeService.AddEmployee(employeeAddRequest).subscribe({
      next : (employee) => {
        this.router.navigate(['employees']);
      }
    });
    
  }

}
