// Angular
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

// Services
import { CookieService } from 'ngx-cookie-service';
import { UserDataService } from "../../user-data.service";
import { TranslationService } from '../../../../translates/translate-service'
// DTO
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

  translateFile: any;
  createUserSubscription: Subscription | undefined;

  constructor(private userService: UserDataService, private cookieService: CookieService, private translationService: TranslationService) {

  }

  ngOnInit(): void {

    this.translateFile = this.translationService.translate('inscription');

    this.userRegistrationForm.get('mail')?.valueChanges.subscribe(() => {
      const mailControl = this.userRegistrationForm.get('mail');

      if (mailControl && mailControl.invalid && mailControl?.value) {
        this.messageErreurMail = this.translateFile.error_message.err_msg_mail_regex;
      } else {
        this.messageErreurMail = "";
      }

    });

    this.userRegistrationForm.get('password')!.valueChanges.subscribe(() => {
      const passwordControl = this.userRegistrationForm.get('password');

      if (passwordControl && passwordControl.value) {
        if (!this.passwordRegex.test(passwordControl.value)) {
          this.messageErreurPassword = this.translateFile.error_message.err_msg_password_regex;
        } else {
          this.messageErreurPassword = "";
        }
      } else {
        this.messageErreurPassword = "";
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

      this.createUserSubscription = this.userService.createUser(userData).subscribe(
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

  passwordMatchValidator(): void {
    const password = this.userRegistrationForm.get('password');
    const confirmPassword = this.userRegistrationForm.get('confirmPassword');

    this.messageErreurConfirmPassword = "";

    if (password && confirmPassword && password.value !== '' && confirmPassword.value !== '') {
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({ passwordMismatch: true });
        this.messageErreurConfirmPassword = this.translateFile.error_message.err_msg_confirm_password;

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
    if (this.createUserSubscription) {
      this.createUserSubscription.unsubscribe();
    }
  }
}
