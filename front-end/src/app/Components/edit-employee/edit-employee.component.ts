import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';

import { EmployeeService } from 'src/app/Services/employees.service';
import { Employee } from 'src/Models/employees.model';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['../add-employee/add-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {
  employeeDetails : Employee = {
    id : '',
    department : '',
    name : '',
    email : '',
    salary : 0,
    phone : 0,
    };

  form: any;
  constructor(private employeeService: EmployeeService, private router: ActivatedRoute, formBuilder: FormBuilder, private navigator:Router) {

    this.form = formBuilder.group({
      id :  [''],
      name : ['', [Validators.required, Validators.minLength(6)]],
      email : ['' , [Validators.required, Validators.email]],
      phone : ['', Validators.required],
      salary : ['', Validators.required],
      department : ['', Validators.required]
    })
  }
  onChange(){
    console.log(this.employeeDetails.name);
    
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

  ngOnInit(): void {
    this.router.paramMap.subscribe({
      next : (params) => {
        const id = params.get('id');
        if(id){
          this.employeeService.GetEmployeeById(id).subscribe({
            next: (response) => {
              this.employeeDetails = response;
              this.form.patchValue(this.employeeDetails);
            }
          });
        } 
      }
    });
  }

  onSubmit(){
    this.employeeDetails = this.form.value;
    this.employeeService.UpdateEmployee(this.employeeDetails.id, this.employeeDetails).subscribe({
      next: (employee) => {
        this.navigator.navigate(['employees']);
      }
    });
  }

  deletePerson(){
    this.employeeService.DeleteEmployee(this.employeeDetails.id).subscribe({
      next : (emp) => {
        this.navigator.navigate(['employees']);
      }
    });
  }
}