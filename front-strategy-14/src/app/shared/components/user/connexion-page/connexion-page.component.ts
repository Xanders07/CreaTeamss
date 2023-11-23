import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {}

  goToConnexionPage(): void {
    this.isConnexionHover = false;
    this.isSignInHover = false;
    this.connexionOpen = false;
    this.inscriptionOpen = false;
  }
}
