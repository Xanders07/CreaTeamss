import { Injectable, OnDestroy } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { concatMap, retry, take } from 'rxjs/operators';

import { UserDataService } from './user-data.service';
import { UserDataDTO } from '../../models/user.model';

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
      concatMap(() => (
        parseInt(this.cookieService.get('userId'))
          ? this.getDataUserByCookie()
          : of(null)
      )),
      take(1)
    )
    .subscribe((userData) => {
      console.log(userData);
      this.updateCurrentDataUser(userData);
    });

  }

  updateUserId(userId: string | ""): void {
    this.userIdSubject.next(userId);
  }

  updateCurrentDataUser(userData: UserDataDTO | null): void {
    this.userCurrentDataSubject.next(userData);
  }

  private getDataUserByCookie(): Observable<UserDataDTO> {
    const userId = parseInt(this.cookieService.get('userId'));

    return this.userDataService.getCurrentDataUserById(userId).pipe(
      take(1)
    );
  }

  ngOnDestroy(): void {
    if (this.userIdSubject) {
      this.userIdSubject.unsubscribe();
      this.userCurrentDataSubject.unsubscribe();
    }
  }
}
