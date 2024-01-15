import { Injectable, OnDestroy } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, BehaviorSubject } from 'rxjs';
import { concatMap, switchMap, take } from 'rxjs/operators';

import { UserDataService } from './user-data.service';
import { ConnexionDTO, UserDataDTO } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private userIdSubject: BehaviorSubject<string | ""> = new BehaviorSubject<string | "">('');
  userId$: Observable<string | ""> = this.userIdSubject.asObservable();

  private userCurrentDataSubject: BehaviorSubject<UserDataDTO | null> = new BehaviorSubject<UserDataDTO | null>(null);
  userCurrentData$: Observable<UserDataDTO | null> = this.userCurrentDataSubject.asObservable();

  constructor(
    private userDataService: UserDataService,
    private cookieService: CookieService
  ) {

    if (this.cookieService.get('userId')) {
      this.userIdSubject.next(this.cookieService.get('userId'));
    }

    this.userCurrentData$ = this.userCurrentDataSubject.asObservable();
    this.userId$ = this.userIdSubject.asObservable();


    this.userCurrentData$.pipe(
      concatMap(() => this.getDataProfilUserByCookie()),
      take(1)
      )
      .subscribe((userData) => {
        console.log('userData');
        console.log(userData);
      });

  }

  updateUserId(userId: string | ""): void {
    this.userIdSubject.next(userId);
  }

  updateCurrentDataUser(userData: UserDataDTO): void {
    this.userCurrentDataSubject.next(userData);
  }

  private getDataProfilUserByCookie(): Observable<UserDataDTO> {

    return new Observable<UserDataDTO>((observer) => {

      let userData: UserDataDTO;
      userData = {
        id: parseInt(this.cookieService.get('userId')),
        pseudo: this.cookieService.get('userPseudo'),
      }
      console.log(userData);

      if (userData) {

        this.userCurrentDataSubject.next(userData);
        observer.next(userData);

      } else {
        this.userCurrentDataSubject.next(null);
      }

      observer.complete();
    });
  }

  ngOnDestroy(): void {
    if (this.userIdSubject) {
      this.userIdSubject.unsubscribe();
      this.userCurrentDataSubject.unsubscribe();
    }
  }
}
