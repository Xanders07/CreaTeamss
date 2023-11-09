import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserDataDTO } from '../../shared/models/user.model'

@Injectable({
  providedIn: 'root'
})
export class HomePageServiceData {
  private baseUrl = 'http://localhost:5000/api/user/';

  constructor(private http: HttpClient) {}

  getCurrentUser(id: number): Observable<any>{

    return this.http.get(`${this.baseUrl}${id}`);
  }
}
