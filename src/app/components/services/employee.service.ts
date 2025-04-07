import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private apollo: Apollo) { }

  getEmployees(): Observable<any> {
    const GET_EMPLOYEES = gql`
      query {
        employees {
          id
          name
          department
          position
          profilePicture
        }
      }
    `;
    return this.apollo.watchQuery({
      query: GET_EMPLOYEES
    }).valueChanges;
  }

  addEmployee(employee: any): Observable<any> {
    const ADD_EMPLOYEE = gql`
      mutation AddEmployee($employee: EmployeeInput!) {
        addEmployee(employee: $employee) {
          id
          name
        }
      }
    `;
    return this.apollo.mutate({
      mutation: ADD_EMPLOYEE,
      variables: { employee }
    });
  }

  deleteEmployee(id: string): Observable<any> {
    const DELETE_EMPLOYEE = gql`
      mutation DeleteEmployee($id: String!) {
        deleteEmployee(id: $id) {
          id
        }
      }
    `;
    return this.apollo.mutate({
      mutation: DELETE_EMPLOYEE,
      variables: { id }
    });
  }

  updateEmployee(id: string, employee: any): Observable<any> {
    const UPDATE_EMPLOYEE = gql`
      mutation UpdateEmployee($id: String!, $employee: EmployeeInput!) {
        updateEmployee(id: $id, employee: $employee) {
          name
          department
        }
      }
    `;
    return this.apollo.mutate({
      mutation: UPDATE_EMPLOYEE,
      variables: { id, employee }
    });
  }
}
