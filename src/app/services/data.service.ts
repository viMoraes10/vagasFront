import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { ILogin } from 'src/app/services'; 
import Jobs from 'src/app/types/jobs';
import { User } from 'src/app/types/user';


const API_URL = 'https://js.devexpress.com/Demos/RwaService/api';

const API_BACK = 'http://localhost:8080';

@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}
 
  public postLogin = (s: ILogin)  => {
    return this.http.post<any>(`${API_BACK}/auth/login`, s);
  } 

  public getJobs = () => {
    const token =  localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.http.get<Jobs[]>(`${API_BACK}/job/all`, { headers });
  }

  public postJobs = (addJob) => {
    const token =  localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.http.post<any>(`${API_BACK}/job/add`, addJob, { headers });
  }

  public getUser = () => {
    const token =  localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const email =  localStorage.getItem('email');

    return this.http.get<User>(`${API_BACK}/user`, { headers, params: { email } });
  } 
   
}
