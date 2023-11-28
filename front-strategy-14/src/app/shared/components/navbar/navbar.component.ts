import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../user/user.service'
import { Observable, Subscription } from 'rxjs';
import { UserDataDTO } from '../../models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  userDataSubscription: Subscription | undefined;
  userConnected = false;

  userImage: string = 'assets/images/profil.jpg';
  isProfileMenuOpen: boolean = false;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {

    this.userDataSubscription = this.userService.userCurrentData$.subscribe((data: UserDataDTO) => {
      console.log(data);

      this.userConnected = !!data.id;

    });

  }

  redirectRoute(routeName: string): void {
    if (routeName === 'accueil') {
      routeName = '';
    }

    this.router.navigate(['/' + routeName]);
  }


  deconnexionUser() {

  }

  toggleProfileMenu(): void {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  ngOnDestroy(): void {
      this.userDataSubscription?.unsubscribe();
  }

}
