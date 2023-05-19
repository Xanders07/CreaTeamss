import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import { UserDataDTO, ConnexionDTO } from '../../models/user.model';

const baseUrl = 'http://localhost:5000/api/user';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) { }

  // create a new user with param
  createUser(data: UserDataDTO): Observable<any> {
    return this.http.post(baseUrl, data);
  }
  connectUser(data: ConnexionDTO): Observable<any> {
    const params = new HttpParams()
      .set('pseudoOrEmail', data.pseudoOrEmail ?? '')
      .set('password', data.password ?? '');

    return this.http.get(baseUrl, { params: params });
  }

}
