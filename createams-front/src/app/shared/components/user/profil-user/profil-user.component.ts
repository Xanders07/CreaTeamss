import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { UserDataDTO } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default

})
export class ProfilUserComponent implements OnInit, OnDestroy {

  isSameUser: boolean = true;
  currentRoute: string = '';
  activeIndex: number = 0;

  private dataRouteUserSubscription: Subscription | undefined;
  private routerEventsSubscription: Subscription | undefined;

  private userDataSubject: BehaviorSubject<UserDataDTO | null> = new BehaviorSubject<UserDataDTO | null>(null);
  userData$: Observable<UserDataDTO | null> = this.userDataSubject.asObservable();


  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.dataRouteUserSubscription = this.activeRoute.data.subscribe(({ userData }) => {
      console.log({'User change data profil-compoenent': userData});

      this.userDataSubject.next(userData)
      this.cdr.detectChanges();
    });

    this.routerEventsSubscription = this.router.events
      .subscribe((event: any) => {
        this.currentRoute = event.urlAfterRedirects;
        this.cdr.detectChanges();

      });
  }

  setActiveIndex(index: number): void {
    console.log(this.activeIndex);

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
