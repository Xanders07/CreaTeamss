import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserDataService } from "../../user-data.service";
import { UserDataDTO } from "../../../../models/user.model";

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

  userInscriptionData = new UserDataDTO;

  passwordConfirm = false;

  constructor( private userService: UserDataService) {  }

  ngOnInit(): void {
  }

  // compare mail and confirm password value, and apply result to validator
  checkConfirmPassword(event: Event): void {
    this.passwordConfirm = this.newUserProfilForm.controls['password'].value === (event.target as HTMLInputElement).value
  }

  onSubmit(): void {
    Object.assign(this.userInscriptionData, this.newUserProfilForm.value);
    this.userService.createUser(this.userInscriptionData).subscribe(() => {});
  }

  ngOnDestroy(): void {
    // this.userService.createUser.unsubscribe();

  }
}
