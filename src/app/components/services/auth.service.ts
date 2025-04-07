import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authSubject = new BehaviorSubject<boolean>(false);

  constructor(private apollo: Apollo) { }

  login(username: string, password: string): Observable<any> {
    const LOGIN_QUERY = gql`
      query Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
          token
        }
      }
    `;
    return this.apollo.watchQuery({
      query: LOGIN_QUERY,
      variables: { username, password }
    }).valueChanges;
  }

  signup(username: string, password: string): Observable<any> {
    const SIGNUP_QUERY = gql`
      mutation Signup($username: String!, $password: String!) {
        signup(username: $username, password: $password) {
          token
        }
      }
    `;
    return this.apollo.mutate({
      mutation: SIGNUP_QUERY,
      variables: { username, password }
    });
  }

  setAuthStatus(status: boolean) {
    this.authSubject.next(status);
  }

  getAuthStatus(): Observable<boolean> {
    return this.authSubject.asObservable();
  }
}
