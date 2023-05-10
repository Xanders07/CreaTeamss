import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from "./services/inscription.service-data";
import { UserDto } from "../../../../models/user.model";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit, OnDestroy {

  newUserProfilForm = new FormGroup({
    pseudo: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    mail: new FormControl('', Validators.required)
  })

  userInscriptionData = new UserDto;

  passwordConfirm = false;

  constructor( private userService: UserService) {  }

  ngOnInit(): void {
  }

  // compare mail and confirm password value, and apply result to validator
  checkConfirmPassword(event: Event): void {
    this.passwordConfirm = this.newUserProfilForm.controls['password'].value === (event.target as HTMLInputElement).value
  }

  onSubmit(): void {
    // console.log(this.userInscriptionData);

    Object.assign(this.userInscriptionData, this.newUserProfilForm.value);

    this.userService.createUser(this.userInscriptionData).subscribe(() => {});

  }

  ngOnDestroy(): void {
    // this.userService.createUser.unsubscribe();

  }
}
