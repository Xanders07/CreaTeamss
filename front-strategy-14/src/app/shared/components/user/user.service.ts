import { Injectable, OnDestroy } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subscription, Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { UserDataService } from './user-data.service';
import { UserDataDTO } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  userIdSubject: BehaviorSubject<string | ""> = new BehaviorSubject<string | "">(this.cookieService.get('userId'));
  userId$: Observable<string | ""> = of();

  private userCurrentDataSubject: BehaviorSubject<UserDataDTO | null> = new BehaviorSubject<UserDataDTO | null>(null);
  userCurrentData$: Observable<UserDataDTO | null> = of();


  userDataSubscription: Subscription | undefined;

  constructor(private userDataService: UserDataService, private cookieService: CookieService) {

    this.userCurrentData$ = this.userCurrentDataSubject.asObservable();
    this.userId$ = this.userIdSubject.asObservable();

    this.userId$
    .pipe(
      switchMap(userIdCookie => {
        return this.getDataProfilUser(userIdCookie);
      })
    )
    .subscribe();

  }

  getDataProfilUser(userIdCookie: string | ""): Observable<void> {

    return new Observable<void>((observer) => {
      if (userIdCookie) {
        const decodeUserId = decodeURIComponent(userIdCookie);

        this.userDataService.getCurrentUser(decodeUserId)
          .pipe(take(1))
          .subscribe(
            userData => {
              this.userCurrentDataSubject.next(userData);
              observer.next();
              observer.complete();
            },
            error => {
              console.error('Error fetching user data:', error);
              observer.error(error);
            }
          );
      } else {
        this.userCurrentDataSubject.next(null);
        observer.next();
        observer.complete();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
      this.userIdSubject.unsubscribe();
    }
  }
}
