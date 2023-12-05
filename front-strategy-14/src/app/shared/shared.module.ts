import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UserDataDTO } from "./models/user.model";

import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer/footer.component';
import { CreateProjetComponent } from '../components/create-projet/create-projet.component';

import { ConnexionComponentPage } from './components/user/connexion-page/connexion-page.component';
import { InscriptionComponent } from './components/user/connexion-page/inscription/inscription.component';
import { ConnexionComponent } from './components/user/connexion-page/connexion/connexion.component';
import { StatutMessageComponent } from './components/statut-message/statut-message.component';

import { MatMenuModule } from '@angular/material/menu';
import { ProfilUserComponent } from './components/user/profil-user/profil-user.component';
import { ProfilComponent } from './components/user/profil-user/profil-user-components/profil/profil.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    CreateProjetComponent,
    ConnexionComponentPage,
    InscriptionComponent,
    ConnexionComponent,
    StatutMessageComponent,
    ProfilUserComponent,
    ProfilComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent
  ],
  providers: [UserDataDTO],
})
export class SharedModule { }
