import { OnInit, OnDestroy } from '@angular/core';
// External import
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

// import test from '../../../../app-routing.module'

//Internal Services
import { UserService } from '../user.service';
import { UserDataDTO } from '../../../models/user.model';

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.scss']
})

export class ProfilUserComponent implements OnInit, OnDestroy{
  userCurrentDataSubscription: Subscription | undefined;

  userData: UserDataDTO | null = null;

  constructor(private userService: UserService) {  }

  ngOnInit(): void {


    this.userService.userCurrentData$.subscribe((user: UserDataDTO | null ) => {
      if (user) {
        this.userData = user;

      }
    });

  }

  ngOnDestroy(): void {
      this.userCurrentDataSubscription?.unsubscribe();
  }
}
