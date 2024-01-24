import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, Event as NavigationEvent } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { UserDataDTO } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.scss']
})
export class ProfilUserComponent implements OnInit, OnDestroy {

  userData: UserDataDTO | null = null;
  isSameUser: boolean = true;
  currentRoute: string = ''; // Variable pour stocker le nom de la route actuelle

  private dataRouteUserSubscription: Subscription | undefined;
  private routerEventsSubscription: Subscription | undefined;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dataRouteUserSubscription = this.activeRoute.data.subscribe(({ userData }) => {
      console.log(this.userData);
      this.userData = userData;
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
