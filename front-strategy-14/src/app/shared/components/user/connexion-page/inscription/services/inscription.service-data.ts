import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { UserDto } from '../../../../../models/user.model';

const baseUrl = 'http://localhost:5000/api/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  test = new Observable<UserDto>;

  constructor(private http: HttpClient) { }

    createUser(data: UserDto): Observable<any>{
      return this.http.post(baseUrl, data);
    }

}
