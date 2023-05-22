import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserDataDTO } from '../../shared/models/user.model'

const baseUrl = 'http://localhost:5000/api/user';

@Injectable({
  providedIn: 'root'
})
export class HomePageServiceData {

  constructor(private http: HttpClient) {}

  getCurrentUser(id: number): Observable<any>{
    console.log(`${baseUrl}/${id}`);

    return this.http.get(`${baseUrl}/${id}`);
  }
}
