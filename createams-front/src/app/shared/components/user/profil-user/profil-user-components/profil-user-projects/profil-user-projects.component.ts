// Angular
import { Component, OnDestroy, OnInit } from '@angular/core';

// Services
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-profil-user-projects',
  templateUrl: './profil-user-projects.component.html',
  styleUrls: ['./profil-user-projects.component.scss']
})
export class ProfilUserProjectsComponent implements OnInit, OnDestroy {

  projectsList: any;

  constructor(private userService : UserService) {

  }

  ngOnInit(): void {

    // this.userService.

  }

  ngOnDestroy(): void {

  }

}
