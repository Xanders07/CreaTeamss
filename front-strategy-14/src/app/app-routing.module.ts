import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component'
import { MesProjetsComponent } from './components/mes-projets/mes-projets.component'

import { ConnexionComponentPage } from './shared/components/user/connexion-page/connexion-page.component';
import { ConnexionComponent } from "./shared/components/user/connexion-page/connexion/connexion.component";
import { InscriptionComponent } from "./shared/components/user/connexion-page/inscription/inscription.component";

const routes: Routes = [
  { path: '', component:  HomePageComponent },
  {
    path: 'connexion-page',
    component:  ConnexionComponentPage,
    children: [
      { path: 'connexion', component: ConnexionComponent },
      { path: 'inscription', component: InscriptionComponent }
    ]
  },
  { path: 'mes-projets', component:  MesProjetsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

