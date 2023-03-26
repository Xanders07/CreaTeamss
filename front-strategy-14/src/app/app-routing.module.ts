import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component'
import { InscriptionComponent } from './shared/components/user/inscription/inscription.component'
import { MesProjetsComponent } from './components/mes-projets/mes-projets.component'

const routes: Routes = [
  { path: '', component:  HomePageComponent},
  { path: 'inscription', component:  InscriptionComponent},
  { path: 'mes-projets', component:  MesProjetsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
