import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Navbar component
import { HomePageComponent } from './components/home-page/home-page.component'
import { MesProjetsComponent } from './components/mes-projets/mes-projets.component'

// Auth
import { ConnexionComponentPage } from './shared/components/user/connexion-page/connexion-page.component';
import { ProfilUserComponent } from './shared/components/user/profil-user/profil-user.component';

// profil user content
import { ModifUserProfilComponent } from './shared/components/user/profil-user/profil-user-components/profil-user-modif/profil-user-modif';
import { UserContactsComponent } from './shared/components/user/profil-user/profil-user-components/user-contacts/user-contacts.component';
import { UserMessagesComponent } from './shared/components/user/profil-user/profil-user-components/user-messages/user-messages.component';

//Resolver
import { CustomerResolver } from "./customer-resolver";

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'connexion-page',
    component: ConnexionComponentPage
  },
  {
    path: 'mes-projets',
    component: MesProjetsComponent
  },
  {
    path: 'profil-user',
    component: ProfilUserComponent,
    children: [
      { path: '', redirectTo: 'modif', pathMatch: 'full' },
      {
        path: 'modif',
        component: ModifUserProfilComponent
      },
      {
        path: 'contacts',
        component: UserContactsComponent
      },
      {
        path: 'messages',
        component: UserMessagesComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

