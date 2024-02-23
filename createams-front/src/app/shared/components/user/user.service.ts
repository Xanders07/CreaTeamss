import { Injectable, OnDestroy } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import {  take } from 'rxjs/operators';

import { UserDataService } from './user-data.service';
import { UserDataProfilDTO } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private userIdSubject: BehaviorSubject<number | null | undefined> = new BehaviorSubject<number | null | undefined>(null);
  userId$: Observable<number | null | undefined> = this.userIdSubject.asObservable();

  private userCurrentDataSubject: ReplaySubject<UserDataProfilDTO | null> = new ReplaySubject<UserDataProfilDTO | null>(1);
  userCurrentData$: Observable<UserDataProfilDTO | null> = this.userCurrentDataSubject.asObservable();

  constructor(
    private userDataService: UserDataService,
    private cookieService: CookieService
  ) {
    this.userId$
    .subscribe(() => {
      if (parseInt(this.cookieService.get('userId'))) {

        this.getDataUserByCookie().pipe(take(1)).subscribe((userData) => {
          if (userData) {
            this.updateCurrentDataUser(userData);
          }
        });

      } else {
        this.updateCurrentDataUser(null);
      }
    });
  }

  updateUserId(userId: number | null | undefined): void {
    this.userIdSubject.next(userId);
  }

  updateCurrentDataUser(userData: UserDataProfilDTO | null): void {
    this.userCurrentDataSubject.next(userData);
  }

  private getDataUserByCookie(): Observable<UserDataProfilDTO> {
    const userId = parseInt(this.cookieService.get('userId'));

    return this.userDataService.getCurrentDataUserById(userId);
  }

  ngOnDestroy(): void {
  }
}
