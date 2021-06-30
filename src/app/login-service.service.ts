import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  login(body): Observable<any> {
    return this.http.post(`http://localhost:3000/login`, body);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`http://localhost:3000/users`);
  }

  addUser(body): Observable<any> {
    return this.http.post(`http://localhost:3000/addUser`, body);
  }

}
