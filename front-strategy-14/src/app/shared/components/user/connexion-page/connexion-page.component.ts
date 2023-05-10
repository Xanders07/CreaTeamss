import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion-page',
  templateUrl: './connexion-page.component.html',
  styleUrls: ['./connexion-page.component.scss']
})
export class ConnexionComponentPage implements OnInit {

  isConnexionHover = false;
  isSignInHover = false;
  connexionOpen = false;
  inscriptionOpen = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  redirectRoute(routeName: string): void {
    if (routeName === 'accueil') {
      routeName = '';
    }

    this.router.navigate(['/' + routeName]);
  }
}
