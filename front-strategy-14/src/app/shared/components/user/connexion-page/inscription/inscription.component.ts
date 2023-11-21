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

  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

  userRegistrationForm = new FormGroup({
    pseudo: new FormControl('', [Validators.required]),
    mail: new FormControl('', [Validators.required, Validators.pattern(this.emailRegex)]),
    password: new FormControl('', [Validators.required, Validators.pattern(this.passwordRegex), Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  messageErreurMail = "";
  messageMailAlreadyIn = "";
  messageErreurPassword = "";
  messageErreurConfirmPassword = "";

  constructor(private userService: UserDataService, private cookieService: CookieService) {  }

  ngOnInit(): void {

    this.userRegistrationForm.get('mail')?.valueChanges.subscribe(() => {
      const mailControl = this.userRegistrationForm.get('mail');
      if (mailControl && mailControl.invalid) {
        this.messageErreurMail = "Adresse e-mail invalide. Assurez-vous d'avoir un '@' ainsi qu'une adresse e-mail valide";
      } else {
        this.messageErreurMail = ""; // Réinitialiser le message d'erreur si la valeur est valide
      }

      console.log(this.messageErreurMail);

    });

    this.userRegistrationForm.get('password')!.valueChanges.subscribe(() => {
      const passwordControl = this.userRegistrationForm.get('password');

      if (passwordControl && passwordControl.value) {
        if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/.test(passwordControl.value)) {
          this.messageErreurPassword = "Le mot de passe doit contenir au moins une lettre, un chiffre et un caractère spécial, et avoir une longueur minimale de 8 caractères.";
        } else {
          this.messageErreurPassword = "";
        }
      }

      this.passwordMatchValidator();
    });


    this.userRegistrationForm.get('confirmPassword')!.valueChanges.subscribe(() => {
      this.passwordMatchValidator();
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
          console.log('Error:', error.error.message);
          if (error.error.message.includes("Email déjà existant")) {
            this.messageMailAlreadyIn = error.error.message;
          }
        }
      );
    }
  }

  passwordMatchValidator() {
    const password = this.userRegistrationForm.get('password');
    const confirmPassword = this.userRegistrationForm.get('confirmPassword');

    this.messageErreurConfirmPassword = "";

    if (password && confirmPassword && password.value !== '' && confirmPassword.value !== '') {
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordMismatch: true });
        this.messageErreurConfirmPassword = "Le mot de passe ne correspond pas avec la confirmation du Mot de passe";
      } else {
        confirmPassword.setErrors(null);
      }
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
