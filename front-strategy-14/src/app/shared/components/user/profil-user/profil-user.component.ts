// External import
import { Component } from '@angular/core';
import { Subscription, Observable, of, BehaviorSubject } from 'rxjs';

//Internal Services
import { UserService } from '../user.service';
import { UserDataDTO } from '../../../models/user.model';

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.scss']
})

export class ProfilUserComponent {

  userData: UserDataDTO = {};

  constructor(private userService: UserService) {
    this.userService.userCurrentData$.subscribe(user => {
      console.log(user);
      if (user) {
        this.userData = user;
      }
    });
  }

}
