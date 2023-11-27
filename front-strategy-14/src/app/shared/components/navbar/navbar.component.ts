import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userConnected: boolean = false;

  userImage: string = 'assets/images/profil.jpg';
  isProfileMenuOpen: boolean = false;

  constructor(private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.userConnected = false;
    const userEmail = this.cookieService.get('userMail');

    if (userEmail) {
      this.userConnected = !this.userConnected;
    }

  }

  redirectRoute(routeName: string): void {
    if (routeName === 'accueil') {
      routeName = '';
    }

    this.router.navigate(['/' + routeName]);
  }

  toggleProfileMenu(): void {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

}
