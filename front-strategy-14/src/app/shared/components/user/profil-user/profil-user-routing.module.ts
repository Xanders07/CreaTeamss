import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfilUserComponent } from './profil-user.component'
import { ModifUserProfilComponent } from './profil-user-components/modif-user-profil/modif-user-profil.component'
import { UserContactsComponent } from './profil-user-components/user-contacts/user-contacts.component'
import { UserMessagesComponent } from './profil-user-components/user-messages/user-messages.component'


const routes: Routes = [
  {
    path: '',
    component:  ProfilUserComponent
  },
  {
    path: 'modif-profil',
    component:  ModifUserProfilComponent
  },
  {
    path: 'user-contacts',
     component:  UserContactsComponent
  },
  {
    path: 'user-messages',
     component:  UserMessagesComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class profilUserRoutingModule { }

