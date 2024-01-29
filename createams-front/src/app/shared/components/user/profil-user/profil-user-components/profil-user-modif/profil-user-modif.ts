import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription, map, take, takeUntil } from 'rxjs';

import { UserDataDTO, UpdateUserDTO } from 'src/app/shared/models/user.model';
import { UserService } from "./../../../user.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslationService } from 'src/app/shared/translates/translate-service';


@Component({
  selector: 'app-profil-user-modif',
  templateUrl: './profil-user-modif.html',
  styleUrls: ['./profil-user-modif.scss']
})
export class ModifUserProfilComponent implements OnInit, OnDestroy {

  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

  messageErreurMail = "";
  messageMailAlreadyIn = "";
  messageErreurConfirmMail = "";
  messageErreurPassword = "";
  messageErreurConfirmPassword = "";

  translateFile: any;

  userUpdateInfosForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    pseudo: new FormControl('', [Validators.required]),
    job: new FormControl('', [Validators.required]),
    mail: new FormControl('', [Validators.required, Validators.pattern(this.emailRegex)]),
    confirmMail: new FormControl('', [Validators.required, Validators.pattern(this.emailRegex)]),
    password: new FormControl('', [Validators.required, Validators.pattern(this.passwordRegex), Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  private unsubscribe$ = new Subject<void>();

  private userDataSubject: BehaviorSubject<UserDataDTO | null> = new BehaviorSubject<UserDataDTO | null>(null);
  userData$: Observable<UserDataDTO | null> = this.userDataSubject.asObservable();

  constructor(
    private userService: UserService,
    private translationService: TranslationService,
    private cdr: ChangeDetectorRef,
    ) {}

  ngOnInit(): void {

    this.translateFile = this.translationService.translate('profilUpdate');
    console.log(this.translateFile);

    const validateField = (field: string) => {
      const control = this.userUpdateInfosForm.get(field);
      if (control && control.invalid && control.value) {
        switch (field) {
          case 'mail':

            this.messageErreurMail = this.translateFile.error_message.err_msg_mail_regex;
          break;

          case 'confirmMail':
            this.mailMatchValidator();
          break;

          case 'password':
            // this.isPasswordValid = this.userUpdateInfosForm.get('password')?.valid ?? false;
            this.messageErreurPassword = this.translateFile.error_message.err_msg_password_regex;
          break;

          case 'confirmPassword':
            this.passwordMatchValidator();
          break;

        }
      } else {

        this.messageErreurMail = '';
        this.messageErreurConfirmMail = '';
        this.messageErreurPassword = '';
        this.messageErreurConfirmPassword = '';
      }
    };

    this.userUpdateInfosForm.get('mail')?.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => validateField('mail'));

    this.userUpdateInfosForm.get('confirmMail')?.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => validateField('confirmMail'));

    this.userUpdateInfosForm.get('password')?.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => validateField('password'));

    this.userUpdateInfosForm.get('confirmPassword')?.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => validateField('confirmPassword'));

    this.userService.userCurrentData$
    .pipe(
      takeUntil(this.unsubscribe$),
      take(1))
    .subscribe((userData: UserDataDTO | null) => {
      console.log(userData);

      this.userDataSubject.next(userData);
      this.cdr.detectChanges();
    });

  }

  passwordMatchValidator(): void {
    const password = this.userUpdateInfosForm.get('password');
    const confirmPassword = this.userUpdateInfosForm.get('confirmPassword');

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

  mailMatchValidator(): void {
    const mail = this.userUpdateInfosForm.get('mail');
    const confirmMail = this.userUpdateInfosForm.get('confirmMail');

    this.messageErreurConfirmMail  = "";

    if (mail && confirmMail && mail.value !== '' && confirmMail.value !== '') {
      if (mail.value !== confirmMail.value) {
        confirmMail.setErrors({ MailMismatch: true });
        this.messageErreurConfirmMail = this.translateFile.error_message.err_msg_confirm_Mail;

      } else {
        confirmMail.setErrors(null);
      }
    }
  }


  onSubmit(): void {
    if (this.userUpdateInfosForm.valid) {
      const userData: UpdateUserDTO = {
        name: this.userUpdateInfosForm.get('name')!.value ?? '',
        surname: this.userUpdateInfosForm.get('surname')!.value ?? '',
        pseudo: this.userUpdateInfosForm.get('pseudo')!.value ?? '',
        mail: this.userUpdateInfosForm.get('mail')!.value ?? '',
        job: this.userUpdateInfosForm.get('job')!.value ?? '',
        password: this.userUpdateInfosForm.get('password')!.value ?? '',
      };


    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
