import { OnInit, OnDestroy } from '@angular/core';
// External import
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute  } from "@angular/router";

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

  constructor() {  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
      this.userCurrentDataSubscription?.unsubscribe();
  }
}
