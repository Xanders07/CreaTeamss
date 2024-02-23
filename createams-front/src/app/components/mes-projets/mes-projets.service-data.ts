import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// const baseUrl = 'http://localhost:5000/api/user';
const baseUrl = 'http://localhost:8080/api/user';  // Spring

@Injectable({
  providedIn: 'root'
})
export class MesProjetsServiceData {

  constructor(private http: HttpClient) {}

  getProjectsByUser(identifiant: string): Observable<any>{
    return this.http.get(`${baseUrl}/projects/${identifiant}`);
  }
}
