import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from 'src/app/services';
import { Observable } from 'rxjs';
import notify from 'devextreme/ui/notify';
   
export interface IResponse {
  isOk: boolean;
  data?: IUser;
  message?: string;
}

enum UserRole {
    ADMIN,
    USER   
}
export interface ILogin {  
  email: string; 
  password: string;
} 

export interface IUser {
  id: number;
  username: string;
  password: string;
  email: string;
  role: UserRole;
}
 
const defaultUser: IUser | null = {
  id: 0,  
  username: '',
  password: '',
  email: '',
  role: UserRole.USER 
}; 
  
const defaultPath = '/';   

const API_BACK = 'http://localhost:8080';
 
@Injectable()
export class AuthService { 
  private _user: IUser | null = defaultUser;

  get loggedIn(): boolean {
    return !!this._user;
  }

  private _lastAuthenticatedPath: string = defaultPath;

  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private router: Router, private http: HttpClient) { } 

  async logIn(email: string, password: string) {
    try { 
      this.http.post<any>(`${API_BACK}/auth/login`, {email: email, password: password}).subscribe({
        next: (response) => {
          console.log('Token:', response);    
            localStorage.setItem('token', response.token);
          this.router.navigate([this._lastAuthenticatedPath]);

          return {
            isOk: true,
            data: this._user,
          };
        },
        error: (error) => { 
          notify(error.message, 'error', 2000); 
        }
      }); 
    } catch {
      return {
        isOk: false,
        message: 'Email ou senha errados',
      };
    }
  }

  async getUser() {
    try {
      // Send request

      return {
        isOk: true,
        data: this._user,
      };
    } catch {
      return {
        isOk: false,
        data: null,
      };
    }
  }

  async createAccount(newUser) {
    try {
      try { 
        this.http.post<any>(`${API_BACK}/auth/register`, newUser).subscribe({
          next: (response) => {
            console.log('user:', response);    
            this.router.navigate([this._lastAuthenticatedPath]);
  
            return {
              isOk: true,
              data: this._user,
            };
          },
          error: (error) => { 
            notify(error.message, 'error', 2000); 
          }
        }); 
      } catch {
        return {
          isOk: false,
          message: 'Authentication failed',
        };
      } 

      this.router.navigate(['/auth/create-account']);
    
    } catch {
      return {
        isOk: false,
        message: 'Failed to create account',
      };
    }
  }

  async changePassword(email: string, recoveryCode: string) {
    try {
      // Send request



      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: 'Failed to change password',
      };
    }
  }

  async resetPassword(email: string) {
    try {
      // Send request

      return {
        isOk: true,
      };
    } catch {
      return {
        isOk: false,
        message: 'Failed to reset password',
      };
    }
  }

  async logOut() {
    this.router.navigate(['/auth/login']);
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;
    const isAuthForm = [
      'login',
      'reset-password',
      'create-account',
      'change-password/:recoveryCode',
    ].includes(route.routeConfig?.path || defaultPath);

    if (!isLoggedIn && isAuthForm) {
      this.router.navigate(['/auth/login']);
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath = route.routeConfig?.path || defaultPath;
    }

    return isLoggedIn || isAuthForm;
  }
}
