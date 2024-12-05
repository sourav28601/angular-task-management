import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})

export class ApiService {
  token: string | undefined;
  userData: any;
  fcmToken: any;

  constructor(private http: HttpClient) {
    this.getLocalStorageData();
  }
  
  getLocalStorageData(): Observable<any> {
    const userData = JSON.parse(localStorage.getItem('user_data') || 'null');
    console.log('hello data', userData);
    return of(userData);
  }
 
  login(data: any) {
    return this.http.post(`${environment.baseUrl}auth/login`, data);
  }
  register(data: any) {
    return this.http.post(`${environment.baseUrl}auth/signup`, data);
  }
  addTask(data:any){
    return this.postApi('task/create',data);
  }
  editTask(id:any){
    return this.getApi(`task/edit/${id}`);
  }
  updateTask(id:any,data:any){
    return this.postApi(`task/update/${id}`,data);
  }
  deleteTask(id:any){
    return this.getApi(`task/delete/${id}`);
  }
 
  getHttpHeaders() {
    const data = JSON.parse(localStorage.getItem('user_data') || '{}');
    console.log("data--",data.data?.token)
    if (data.data?.token) {
      this.token = data.data?.token;
    } else if (data) {
      this.token = data.data?.token;
    }

    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`,
      }),
    };
  }
  getApi(url: string): Observable<any> {
    return this.http.get(`${environment.baseUrl}${url}`, this.getHttpHeaders());
  }
  postApi(url: any, data: any) {
    return this.http.post(`${environment.baseUrl}${url}`, data, this.getHttpHeaders());
  }
  postUpdateApi(url: any) {
    return this.http.post(`${environment.baseUrl}${url}`, {}, this.getHttpHeaders());
  }
  deleteApi(url: string): Observable<any> {
    return this.http.delete(`${environment.baseUrl}${url}`, this.getHttpHeaders());
  }
}
