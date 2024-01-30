import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders  } from '@angular/common/http';

import { UserInscriptionDataDTO, ConnexionDTO, UserDataDTO, UpdateUserDTO } from '../../models/user.model';

// const baseUrl = 'http://localhost:5000/api/user';  NODE
const baseUrl = 'http://localhost:8080/api/user';  // Spring

@Injectable({
  providedIn: 'root'
})
export class UserDataService {


  constructor(private http: HttpClient) { }
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  // create a new user with param
  createUser(data: UserInscriptionDataDTO): Observable<UserInscriptionDataDTO> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = { headers: headers, withCredentials: true };

    return this.http.post(baseUrl + '/create', data, options).pipe(
      catchError((error) => {

        console.error(error.status === 409
                    ? 'Email deja existant: ' + error.error.message
                    : `Erreur de création de l'utilisateur: ` + error.error.message);

        return throwError(error);
      })
    );
  }
  // create a new user with param
  updateUser(data: UpdateUserDTO): Observable<UpdateUserDTO> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const options = { headers: headers, withCredentials: true };

    return this.http.post(baseUrl + '/update', data, options).pipe(
      catchError((error) => {

        console.error(error.status === 409
                    ? 'Email deja existant: ' + error.error.message
                    : `Erreur de la modification de l'utilisateur: ` + error.error.message);

        return throwError(error);
      })
    );
  }

  // check if mail and password exist, and return userData
  connectUser(data: ConnexionDTO): Observable<UserDataDTO> {
    const url = `${baseUrl}/connect`;
    const params = new HttpParams()
        .set('mail', data.mail ?? '')
        .set('password', data.password ?? '');

    return this.http.get<UserDataDTO>(url, { params: params });
  }

  // get user bi Id
  getCurrentDataUserById(userId: number): Observable<UserDataDTO> {
    const url = `${baseUrl}/getDataUser`;
    const params = new HttpParams().set('userId', userId ? userId.toString() : '');

    return this.http.get<UserDataDTO>(url, { params: params })
      .pipe(
        catchError((error) => {
          console.error("An error occurred:", error);
          return throwError("Error fetching user data");
        })
      );
  }


}
