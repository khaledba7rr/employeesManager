import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { environment } from 'src/Environments/envoronment';
import { Employee } from 'src/Models/employees.model';
import { Observable } from 'rxjs';
import { Router } from 'express';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  baseUrl: string = environment.baseApiUrl;

  constructor(private http : HttpClient) 
  {

  }
  GetAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl+'/api/employees');
  }

  AddEmployee(employeeAddRequest: Employee): Observable<Employee>{
    return this.http.post<Employee>(this.baseUrl +'/api/employees', employeeAddRequest);
  }

  GetEmployeeById(id: string): Observable<Employee>{
    return this.http.get<Employee>(this.baseUrl + '/api/employees/' + id );
  }

  UpdateEmployee(id:string, employeeUpdateRequest: Employee):Observable<Employee>{
    return this.http.put<Employee>(this.baseUrl + "/api/employees/"+ id,employeeUpdateRequest);
  }

  DeleteEmployee(id:string): Observable<Employee>{
    return this.http.delete<Employee>(this.baseUrl+ "/api/employees/" + id);
  }

}
