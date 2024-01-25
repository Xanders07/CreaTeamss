//External Export
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription, take } from 'rxjs';

// internal DTO
import { UserDataDTO } from '../../models/user.model';

// Interna Service
import { UserService } from '../user/user.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  userConnected = false;
  userDataSubscription: Subscription | undefined;

  userImage: string = 'assets/images/profil.jpg';
  isProfileMenuOpen: boolean = false;

  constructor(private router: Router, private userService: UserService, private cookieService: CookieService) { }

  ngOnInit(): void {

    // check if userConnect
    this.userDataSubscription = this.userService.userCurrentData$
    .subscribe((data: UserDataDTO | null) => {
      console.log({"data user userCurrentData$ in navbar": data});
        this.userConnected = !!data?.id || false;
    });

  }

  redirectRoute(routeName: string): void {
    if (routeName === 'accueil') {
      routeName = '';
    }

    this.router.navigate(['/' + routeName]);
  }

  deconnexionUser() {
    this.userConnected = false;
    this.cookieService.delete('userId');
    this.cookieService.delete('userPseudo');
    this.userService.updateCurrentDataUser(null);

    this.router.navigate(['/']);
  }

  toggleProfileMenu(): void {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  ngOnDestroy(): void {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }

}
