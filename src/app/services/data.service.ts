import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { DateTime } from 'luxon';
import {
  map,
  groupBy,
  mergeMap,
  toArray,
} from 'rxjs/operators';
import { Task } from 'src/app/types/task';
import { Contact } from 'src/app/types/contact'; 
import { Sale, SalesOrOpportunitiesByCategory } from '../types/analytics';
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

  public getContacts = () =>
    this.http.get<Contact[]>(`${API_URL}/Users/Contacts`);

  public getContact = (id: number) =>
    this.http.get<Contact>(`${API_URL}/Users/Contacts/${id}`);

  public getTasks = (): Observable<Task[]> =>
    this.http.get<Task[]>(`${API_URL}/Employees/AllTasks`);

  public getFilteredTasks = (): Observable<Task[]> =>
    this.http.get<Task[]>(`${API_URL}/Employees/FilteredTasks`);

  public getTask = (id: number): Observable<Task> =>
    this.http.get<Task>(`${API_URL}/Employees/Tasks/${id}`);

  public getContactNotes = (id: number) =>
    this.http.get(`${API_URL}/Users/Contacts/${id}/Notes`);

  public getContactMessages = (id: number) =>
    this.http.get(`${API_URL}/Users/Contacts/${id}/Messages`);

  public getActiveContactOpportunities = (id: number) =>
    this.getContactOpportunities(id, true);

  public getClosedContactOpportunities = (id: number) =>
    this.getContactOpportunities(id, false);

  public getContactOpportunities = (id: number, isActive: boolean) => this.http
    .get<any>(`${API_URL}/Users/Contacts/${id}/Opportunities`)
    .pipe(
      map((data) => data.filter((_: any, index: number) => {
        const isEven = index % 2 === 0;
        return isActive ? isEven : !isEven;
      })),
    );

  public getSalesByStateAndCity = (startDate: string, endDate: string) => this.http
    .get(`${API_URL}/Analytics/SalesByStateAndCity/${startDate}/${endDate}`);

  public getSalesByState = (data) => {
    let dataByState;
    from(data)
      .pipe(
        groupBy((s: any) => s.stateName),
        mergeMap((group) => group.pipe(toArray())),
        map((val) => {
          let total = 0;
          let percentage = 0;
          val.forEach((v) => {
            total = total + v.total;
            percentage = percentage + v.percentage;
          });

          return {
            stateName: val[0].stateName,
            stateCoords: val[0].stateCoords,
            total,
            percentage,
          };
        }),
        toArray(),
      ).subscribe((data) => {
        dataByState = data;
      });

    return dataByState;
  };

  public getOpportunitiesByCategory = (startDate: string, endDate: string) => this.http
    .get<SalesOrOpportunitiesByCategory>(`${API_URL}/Analytics/OpportunitiesByCategory/${startDate}/${endDate}`);

  public getSalesByCategory = (startDate: string, endDate: string) => this.http
    .get<SalesOrOpportunitiesByCategory>(`${API_URL}/Analytics/SalesByCategory/${startDate}/${endDate}`);

  public getSalesByOrderDate = (groupByPeriod: string) => this.http
    .get<Sale[]>(`${API_URL}/Analytics/SalesByOrderDate/${groupByPeriod}`);

  public getSales = (startDate: string, endDate: string) => this.http
    .get<Sale[]>(`${API_URL}/Analytics/Sales/${startDate}/${endDate}`);

  public getProfile = (id: number) =>
    this.http.get<Record<string, any>>(`${API_URL}/Users/Contacts/${id}`).pipe(
      map((data)=> {
        data.gender = id == 22 ? 'female' : null;
        data.birthDate = new Date('1980/05/03');
        data.hiredDate = new Date('2023/03/03');
        data.department = 'UI/UX';
        data.position = 'Designer';
        data.domainUsername = 'corp\\amelia.harper';
        data.country = 'USA';
        data.city = 'New York';
        data.state = 'New York';
        data.address = '405 E 42nd St';
        data.supervisor = 'Sam Adamson';
        return data;
      })
    );

  public getSupervisors = () => {
    const items = [{}];

    return from([items])
  };

  public getListDS = () => from([[
    {
      key: 'id',
      items: ['Brett Johnson', 'Tasks', 'Reminder', 'Contacts']
        .map((text) => ({ list: 'My Calendars', text }))
        .concat({ list: 'Other Calendars', text: 'Holidays' }),
    },
  ]]);

  public getDefaultListDS = () => from([[
    {
      key: 'My Calendars',
      items: [
        {
          id: 0,
          text: 'Brett Johnson',
          color: '#B3E5FC',
          checkboxColor: '#29B6F6',
        }],
    },
    {
      key: 'Other Calendars',
      items: [{
        id: 4,
        text: 'Holidays',
        color: '#F3E5F5',
        checkboxColor: '#AB47BC',
      }],
    },
  ]]);

  public getAppointmentsDefaultTime = (index) => [
    {
      weekDay: 0,
      weekIndex: 0,
      defaultTime: {
        hours: 7,
        minutes: 30,
      },
    },
    {
      weekDay: 1,
      weekIndex: 0,
      defaultTime: {
        hours: 10,
      },
    },
    {
      weekDay: 2,
      weekIndex: 0,
      defaultTime: {
        hours: 8,
        minutes: 30,
      },
    },
    {
      weekDay: 3,
      weekIndex: 0,
      defaultTime: {
        hours: 7,
      },
    },
    {
      weekDay: 0,
      weekIndex: 1,
      defaultTime: {
        hours: 9,
      },
    },
    {
      weekDay: 1,
      weekIndex: 1,
      defaultTime: {
        hours: 7,
      },
    },
    {
      weekDay: 2,
      weekIndex: 1,
      defaultTime: {
        hours: 8,
        minutes: 30,
      },
    },
    {
      weekDay: 3,
      weekIndex: 1,
      defaultTime: {
        hours: 9,
        minutes: 30,
      },
    },
    {
      weekDay: 1,
      weekIndex: 2,
      defaultTime: {
        hours: 8,
        minutes: 20,
      },
    },
    {
      weekDay: 2,
      weekIndex: 2,
      defaultTime: {
        hours: 9,
        minutes: 40,
      },
    },
    {
      weekDay: 3,
      weekIndex: 2,
      defaultTime: {
        hours: 8,
        minutes: 30,
      },
    },
  ][index];

  public getSchedulerTasks = () => {
    const promptDescription = `The HtmlEditor component is a client-side WYSIWYG text editor.
The editor allows users to format text and integrate media elements into documents.
The result can be exported to HTML or Markdown.`;

    return this.getTasks().pipe(
      map((tasks) => {
        const today = DateTime.now();
        const mondayMidnight = today.set({
          weekday: 1, hour: 0, minute: 0, second: 0, millisecond: 0,
        });
        const uniqueTasks = tasks.slice(0, 11);

        return uniqueTasks.map((task, index) => {
          const { weekDay, weekIndex, defaultTime } = this.getAppointmentsDefaultTime(index);
          const taskStart = mondayMidnight.plus({
            weeks: weekIndex,
            days: weekDay,
          }).plus(defaultTime);
          return {
            ...task,
            startDate: taskStart.toJSDate(),
            endDate: taskStart.plus({ hours: 3 }).toJSDate(),
            description: promptDescription,
            calendarId: weekDay,
          };
        });
      }))
  };
}
