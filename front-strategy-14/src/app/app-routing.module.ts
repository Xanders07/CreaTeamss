import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component'
import { MesProjetsComponent } from './components/mes-projets/mes-projets.component'

import { ConnexionComponentPage } from './shared/components/user/connexion-page/connexion-page.component';
import { ProfilUserComponent } from './shared/components/user/profil-user/profil-user.component';

const routes: Routes = [
  {
    path: '',
    component:  HomePageComponent
  },
  {
    path: 'connexion-page',
    component:  ConnexionComponentPage
  },
  {
    path: 'mes-projets',
     component:  MesProjetsComponent
  },
  {
    path: 'profil-user',
     component:  ProfilUserComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

