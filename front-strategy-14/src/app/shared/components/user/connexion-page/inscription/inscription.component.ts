import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

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
    password: new FormControl('', [Validators.required, Validators.minLength(1)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(1)]),
  });

  passwordConfirm = false;
  errForm = false;
  messageFormPseudo = "";
  messageFormMail = "";
  messageFormPassword = "";
  messageFormConfirm = "";

  constructor( private userService: UserDataService, private cookieService: CookieService) {  }

  ngOnInit(): void {

    this.userRegistrationForm.get('pseudo')!.valueChanges.subscribe((value) => {

    });

    this.userRegistrationForm.get('mail')!.valueChanges.subscribe((value) => {

    });

    this.userRegistrationForm.get('password')!.valueChanges.subscribe((value) => {
      this.passwordConfirm = this.userRegistrationForm.controls['password'].value === this.userRegistrationForm.controls['confirmPassword'].value;
    });

    this.userRegistrationForm.get('confirmPassword')!.valueChanges.subscribe((value) => {
      console.log(value);

      this.passwordConfirm = this.userRegistrationForm.controls['password'].value === this.userRegistrationForm.controls['confirmPassword'].value;
      if (!this.passwordConfirm) {
        this.messageFormConfirm = "";
        this.messageFormPassword = "";
      }
    });

  }

  onSubmit(): void {
    if (this.userRegistrationForm.valid) {
      const userData: UserInscriptionDataDTO = {
        pseudo: this.userRegistrationForm.get('pseudo')!.value ?? '',
        mail: this.userRegistrationForm.get('mail')!.value ?? '',
        password: this.userRegistrationForm.get('password')!.value ?? '',
      };


      this.userService.createUser(userData).subscribe(
        (response) => {
          console.log('User created:', response);
        },
        (error) => {
          console.log('here');

          console.log(error.error.message);
        }
      );

    } else {
      // Le formulaire n'est pas valide, affichez des messages d'erreur ou effectuez d'autres actions
    }
  }

  getUserDataFromCookie(): void {
    const userDataCookie = this.cookieService.get('user');
    console.log(userDataCookie);

    if (userDataCookie) {
      const userData = JSON.parse(userDataCookie);
      console.log(userData);
    } else {
      console.error('User cookie not found or malformed.');
    }
  }

  ngOnDestroy(): void {
    // this.userService.createUser.unsubscribe();

  }
}
