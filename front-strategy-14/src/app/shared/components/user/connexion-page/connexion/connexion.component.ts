import { OnDestroy } from '@angular/core';
// Angular
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
// DTO
import { ConnexionDTO } from '../../../../models/user.model';

// Services
import { UserDataService } from "../../user-data.service";
import { TranslationService } from '../../../../translates/translate-service'

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})

export class ConnexionComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;

  messageErreurMail = "";
  messageMailAlreadyIn = "";
  messageErreurPassword = "";

  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

  connexionSubscription: Subscription | undefined;

  userConnexionForm = new FormGroup({
    mail: new FormControl('', [Validators.required, Validators.pattern(this.emailRegex)]),
    password: new FormControl('', [Validators.required, Validators.pattern(this.passwordRegex), Validators.minLength(8)]),
  });

  translateFile: any;

  constructor(private UserDataService: UserDataService,
    private translationService: TranslationService,
    private cookieService: CookieService) { }

  ngOnInit(): void {
    this.translateFile = this.translationService.translate('connexion');

    this.loginForm = new FormGroup({
      identifier: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {

      const userDto: ConnexionDTO = {
        mail: this.loginForm.get('identifier')?.value,
        password: this.loginForm.get('password')?.value
      };

      this.connexionSubscription = this.UserDataService.connectUser(userDto).subscribe(
        () => {
          // if connect past, stock in cookies
          this.cookieService.set('userMail', userDto.mail!);
          const userEmail = this.cookieService.get('userMail');
          const decodedEmail = decodeURIComponent(userEmail);
          console.log(decodedEmail);

        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  ngOnDestroy(): void {
    if (this.connexionSubscription) {
      this.connexionSubscription.unsubscribe();
    }
  }

}
