import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userConnected: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userConnected = false;
  }

  redirectRoute(routeName: string): void {
    if (routeName === 'accueil') {
      routeName = '';
    }

    this.router.navigate(['/' + routeName]);
  }

}
