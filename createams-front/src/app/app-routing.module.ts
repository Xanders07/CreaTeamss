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
import { ProfilUserContactsComponent } from './shared/components/user/profil-user/profil-user-components/profil-user-contacts/profil-user-contacts.component';
import { ProfilUserProjectsComponent } from './shared/components/user/profil-user/profil-user-components/profil-user-projects/profil-user-projects.component';

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
        component: ProfilUserContactsComponent
      },
      {
        path: 'projects',
        component: ProfilUserProjectsComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

