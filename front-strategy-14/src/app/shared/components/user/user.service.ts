import { Injectable, OnDestroy } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subscription, Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { UserDataService } from './user-data.service';
import { UserDataDTO, ProjectsDTO } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private userIdSubject: BehaviorSubject<string | ""> = new BehaviorSubject<string | "">('');
  userId$: Observable<string | ""> = this.userIdSubject.asObservable();

  private userCurrentDataSubject: BehaviorSubject<UserDataDTO | null> = new BehaviorSubject<UserDataDTO | null>(null);
  userCurrentData$: Observable<UserDataDTO | null> = this.userCurrentDataSubject.asObservable();

  private userProjectsDataSubject: BehaviorSubject<ProjectsDTO[] | null> = new BehaviorSubject<ProjectsDTO[] | null>(null);
  userProjectsData$: Observable<ProjectsDTO[] | null> = this.userProjectsDataSubject.asObservable();

  constructor(
    private userDataService: UserDataService,
    private cookieService: CookieService
  ) {


    if (this.cookieService.get('userId')) {
      this.userIdSubject.next(this.cookieService.get('userId'));
    }

    this.userCurrentData$ = this.userCurrentDataSubject.asObservable();
    this.userId$ = this.userIdSubject.asObservable();

    this.userId$
    .pipe(
      switchMap(userId => {
        return this.getDataProfilUserById(userId);
      })
    )
    .subscribe();

  }

  updateUserId(userId: string | ""): void {
    this.userIdSubject.next(userId);
  }

  fetchDataForUserId(userId: string | ""): void {
    this.userId$
      .pipe(
        switchMap(id => {
          return this.getDataProfilUserById(id);
        })
      )
      .subscribe();
  }

  private getDataProfilUserById(userId: string | ""): Observable<UserDataDTO> {

    return new Observable<UserDataDTO>((observer) => {
      if (userId) {
        const decodeUserId = decodeURIComponent(userId);

        this.userDataService.getCurrentUser(parseInt(decodeUserId))
          .pipe(take(1))
          .subscribe(
            userData => {
              this.userCurrentDataSubject.next(userData);
              observer.complete();
            },
            error => {
              console.error('Error fetching user data:', error);
              observer.error(error);
            }
          );
      } else {
        this.userCurrentDataSubject.next(null);
        observer.complete();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userIdSubject) {
      this.userIdSubject.unsubscribe();
    }
  }
}
