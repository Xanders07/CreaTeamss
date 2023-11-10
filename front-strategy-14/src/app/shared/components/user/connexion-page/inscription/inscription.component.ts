import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserDataService } from "../../user-data.service";
import { UserInscriptionDataDTO } from '../../../../models/user.model';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent implements OnInit, OnDestroy {

  userRegistrationForm = new FormGroup({
    pseudo: new FormControl('', [Validators.required]),
    mail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  passwordConfirm = false;

  constructor( private userService: UserDataService) {  }

  ngOnInit(): void {
  }

  // compare mail and confirm password value, and apply result to validator
  checkConfirmPassword(event: Event): void {
    this.passwordConfirm = this.userRegistrationForm.controls['password'].value === (event.target as HTMLInputElement).value
    console.log(this.passwordConfirm);
    console.log(this.userRegistrationForm.valid);

  }

  onSubmit(): void {
    if (this.userRegistrationForm.valid) {
      const userData: UserInscriptionDataDTO = {
        pseudo: this.userRegistrationForm.get('pseudo')!.value ?? '',
        mail: this.userRegistrationForm.get('mail')!.value ?? '',
        password: this.userRegistrationForm.get('password')!.value ?? '',
      };


      this.userService.createUser(userData).subscribe((response) => {
        console.log(response);

      });
    } else {
      // Le formulaire n'est pas valide, affichez des messages d'erreur ou effectuez d'autres actions
    }
  }

  ngOnDestroy(): void {
    // this.userService.createUser.unsubscribe();

  }
}
