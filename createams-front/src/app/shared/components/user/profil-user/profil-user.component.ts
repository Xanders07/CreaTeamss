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
  currentRoute: string = ''; // Variable pour stocker le nom de la route actuelle

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
      this.userDataSubject.next(userData)
      this.cdr.detectChanges();
    });

    // Observer les événements de navigation pour mettre à jour la variable currentRoute
    this.routerEventsSubscription = this.router.events
      .subscribe((event: any) => {
        console.log(event);

        this.currentRoute = event.urlAfterRedirects; // Met à jour le nom de la route
      });
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
