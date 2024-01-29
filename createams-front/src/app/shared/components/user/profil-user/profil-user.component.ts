import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { UserDataDTO } from 'src/app/shared/models/user.model';
import { UserService } from "./../user.service";

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.scss'],

})
export class ProfilUserComponent implements OnInit, OnDestroy {

  isSameUser: boolean = true;
  activeIndex: number = 0;

  private dataRouteUserSubscription: Subscription | undefined;

  private userDataSubject: BehaviorSubject<UserDataDTO | null> = new BehaviorSubject<UserDataDTO | null>(null);
  userData$: Observable<UserDataDTO | null> = this.userDataSubject.asObservable();

  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.dataRouteUserSubscription = this.userService.userCurrentData$.subscribe((userData: UserDataDTO | null) => {
      this.userDataSubject.next(userData)
    });

  }

  setActiveIndex(index: number): void {
    this.activeIndex = index;
  }

  ngOnDestroy(): void {
    if (this.dataRouteUserSubscription) {
      this.dataRouteUserSubscription.unsubscribe();
    }
  }
}
