// Angular
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

// Services
import { UserService } from "./../user.service";

// DTO's
import { UserDataProfilDTO } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.scss'],

})
export class ProfilUserComponent implements OnInit, OnDestroy {

  isSameUser: boolean = true;
  activeIndex: number = 0;

  private dataRouteUserSubscription: Subscription | undefined;

  private userDataSubject: BehaviorSubject<UserDataProfilDTO | null> = new BehaviorSubject<UserDataProfilDTO | null>(null);
  userData$: Observable<UserDataProfilDTO | null> = this.userDataSubject.asObservable();

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.activeIndex);

    const currentUrl = this.router.url;
    console.log('Current URL:', currentUrl);

    switch (currentUrl) {
      case '/profil-user/modif':
        this.activeIndex = 0;
      break;
      case '/profil-user/contacts':
        this.activeIndex = 1;
      break;
      case '/profil-user/projects':
        this.activeIndex = 2;
      break;
    }

    this.dataRouteUserSubscription = this.userService.userCurrentData$.subscribe((userData: UserDataProfilDTO | null) => {
      this.userDataSubject.next(userData);
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
  }
}
