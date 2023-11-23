import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component'
import { MesProjetsComponent } from './components/mes-projets/mes-projets.component'

import { ConnexionComponentPage } from './shared/components/user/connexion-page/connexion-page.component';

const routes: Routes = [
  { path: '', component:  HomePageComponent },
  {
    path: 'connexion-page',
    component:  ConnexionComponentPage
  },
  { path: 'mes-projets', component:  MesProjetsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

