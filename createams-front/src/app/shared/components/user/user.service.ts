import { Injectable, OnDestroy } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { UserDataService } from './user-data.service';
import { UserDataDTO } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private userIdSubject: BehaviorSubject<string | ""> = new BehaviorSubject<string | "">('');
  userId$: Observable<string | ""> = this.userIdSubject.asObservable();

  private userCurrentDataSubject: ReplaySubject<UserDataDTO | null> = new ReplaySubject<UserDataDTO | null>(1);
  userCurrentData$: Observable<UserDataDTO | null> = this.userCurrentDataSubject.asObservable();

  constructor(
    private userDataService: UserDataService,
    private cookieService: CookieService
  ) {
    this.userId$.subscribe(() => {
      if (parseInt(this.cookieService.get('userId'))) {

        this.getDataUserByCookie().pipe(take(1)).subscribe((userData) => {
          this.updateCurrentDataUser(userData);
        });

      } else {
        this.updateCurrentDataUser(null);
      }
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
    console.log(userId);

    return this.userDataService.getCurrentDataUserById(userId);
  }

  ngOnDestroy(): void {
  }
}
