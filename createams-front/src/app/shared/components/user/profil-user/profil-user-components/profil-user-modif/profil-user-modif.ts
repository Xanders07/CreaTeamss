import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, map } from 'rxjs';

import { UserDataDTO } from 'src/app/shared/models/user.model';
import { UserService } from "./../../../user.service";


@Component({
  selector: 'app-profil-user-modif',
  templateUrl: './profil-user-modif.html',
  styleUrls: ['./profil-user-modif.scss']
})
export class ModifUserProfilComponent implements OnInit {

  profileForm: any = {};

  private userDataSubject: BehaviorSubject<UserDataDTO | null> = new BehaviorSubject<UserDataDTO | null>(null);
  userData$: Observable<UserDataDTO | null> = this.userDataSubject.asObservable();

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.userCurrentData$.subscribe((userData: UserDataDTO | null) => {
      console.log(userData);

      this.userDataSubject.next(userData);
    });

  }

  onSubmit() {

  }

}
