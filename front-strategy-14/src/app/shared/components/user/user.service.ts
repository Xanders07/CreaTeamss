import { Injectable, OnDestroy } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subscription, Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { UserDataService } from './user-data.service';
import { UserDataDTO } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService implements OnDestroy {
  userCurrentData$: Observable<UserDataDTO> = of();
  userDataSubscription: Subscription | undefined;

  constructor(private userDataService: UserDataService, private cookieService: CookieService) { }

  checkIfUserConnect(): void {
    const userEmail = this.cookieService.get('userMail');

    if (userEmail) {
      const decodedEmail = decodeURIComponent(userEmail);
      this.userCurrentData$ = of(decodedEmail).pipe(
        switchMap(email => this.userDataService.getCurrentUser(email)),
        take(1)
      );
    }
  }

  ngOnDestroy(): void {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }
}
