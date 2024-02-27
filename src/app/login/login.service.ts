import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserRole } from '../utilities/user/user-role.enum';
import { User } from '../utilities/user/user.model';
import { LoginErrorModel } from './login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  defaultValue = {
    id: 0,
    name: '',
    role: UserRole.NONE
  };
  currentUser: BehaviorSubject<User> = new BehaviorSubject<User>({ ...this.defaultValue });

  errorInformation: BehaviorSubject<LoginErrorModel[]> = new BehaviorSubject<LoginErrorModel[]>([]);

  login(username: string, password: string): Observable<User> {
    this.errorInformation.next([]);
    let userInfo: User;

    if (username === 'admin' && password === 'admin') {
      userInfo = {
        id: 1, name: 'Admin', role: UserRole.ADMIN
      };
    } else if (username === 'manager' && password === 'manager') {
      userInfo = {
        id: 2, name: 'Manager', role: UserRole.MANAGER
      };
    } else if (username === 'user' && password === 'user') {
      userInfo = {
        id: 3, name: 'User', role: UserRole.USER
      };
    } else {
      const errorInfo: LoginErrorModel = {
        errorStatus: true,
        errorCode: 'LOGIN_INVALID',
        errorMessage: 'Username or password is wrong. Please try again!',
      };
      this.errorInformation.next([errorInfo]);
      userInfo = { ...this.defaultValue };
    }
    this.currentUser.next(userInfo);
    console.log(this.currentUser, 'this.currentUser');
    return of(this.currentUser.value);
  }

  isLoggedIn(): boolean {
    return this.currentUser.value.id > 0;
  }

  getCurrentUser(): User {
    return this.currentUser.value;
  }

  getCurrentUserRole(): UserRole {
    return this.currentUser.value.role;
  }
}
