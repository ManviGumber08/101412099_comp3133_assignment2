import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class AddEmployeeComponent {
  addEmployeeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.addEmployeeForm = this.fb.group({
      name: ['', [Validators.required]],
      department: ['', [Validators.required]],
      position: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.addEmployeeForm.valid) {
      const employee = this.addEmployeeForm.value;
      this.employeeService.addEmployee(employee).subscribe(
        (response: any) => {
          this.router.navigate(['/employees']);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
