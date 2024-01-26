import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { UserDataDTO } from 'src/app/shared/models/user.model';
import { UserService } from "./../user.service";

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default

})
export class ProfilUserComponent implements OnInit, OnDestroy {

  isSameUser: boolean = true;
  activeIndex: number = 0;

  private dataRouteUserSubscription: Subscription | undefined;
  private routerEventsSubscription: Subscription | undefined;

  private userDataSubject: BehaviorSubject<UserDataDTO | null> = new BehaviorSubject<UserDataDTO | null>(null);
  userData$: Observable<UserDataDTO | null> = this.userDataSubject.asObservable();

  userDataToRoute: BehaviorSubject<UserDataDTO | null> = new BehaviorSubject<UserDataDTO | null>(null);

  constructor(
    private cdr: ChangeDetectorRef,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.dataRouteUserSubscription = this.userService.userCurrentData$.subscribe((userData: UserDataDTO | null) => {

      this.userDataSubject.next(userData)
      this.userDataToRoute.next(userData)
      this.cdr.detectChanges();
    });

  }

  setActiveIndex(index: number): void {
    this.activeIndex = index;
  }

  ngOnDestroy(): void {
    if (this.dataRouteUserSubscription) {
      this.dataRouteUserSubscription.unsubscribe();
    }

    if (this.routerEventsSubscription) {
      this.routerEventsSubscription.unsubscribe();
    }
  }
}
