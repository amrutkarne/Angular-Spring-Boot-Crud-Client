import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080';

  

  constructor(private http : HttpClient) { }

  getUser(id: number) : Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa('admin:admin123')
      })
    };
    return this.http.get(`${this.baseUrl}/users/${id}`,httpOptions);
  }

  deleteUser(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa('admin:admin123')
      })
    };
    return this.http.delete(`${this.baseUrl}/users/${id}`, httpOptions);
  }

  getUserList(): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa('admin:admin123')
      })
    };
    return this.http.get(`${this.baseUrl}/users`,httpOptions);
  }

  addUser(user : Object) : Observable<Object> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa('admin:admin123')
      })
    };
    return this.http.post(`${this.baseUrl}/users`, user,httpOptions);
  }

  updateUser(id : number,value : any) : Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa('admin:admin123')
      })
    };
    return this.http.put(`${this.baseUrl}/users/${id}`,value,httpOptions);
  }
}
