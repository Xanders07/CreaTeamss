import { Injectable, OnDestroy } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subscription, Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { UserDataService } from './user-data.service';
import { UserDataDTO } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  userCurrentData$: Observable<UserDataDTO> = of(); // init var observable empty
  userDataSubscription: Subscription | undefined;

  constructor(private userDataService: UserDataService, private cookieService: CookieService) {
    this.getDataProfilUser();
  }

  getDataProfilUser(): void {
    const userId = this.cookieService.get('userId');

    if (userId) {
      const decodeUserId = decodeURIComponent(userId);

      // if decodeId Found, get one emit of user
      this.userCurrentData$ = of(decodeUserId).pipe(
        switchMap(userId => this.userDataService.getCurrentUser(userId)),
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
