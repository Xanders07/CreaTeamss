import { Component } from '@angular/core';

import { UserService } from '../user.service';

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.scss']
})

export class ProfilUserComponent {

  constructor(private userService: UserService) {

  }

}
