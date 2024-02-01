import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, take, takeUntil } from 'rxjs';

import { UserDataDTO, UpdateUserDTO } from 'src/app/shared/models/user.model';
import { UserService } from "./../../../user.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslationService } from 'src/app/shared/translates/translate-service';
import { UserDataService } from '../../../user-data.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-profil-user-modif',
  templateUrl: './profil-user-modif.html',
  styleUrls: ['./profil-user-modif.scss']
})
export class ModifUserProfilComponent implements OnInit, OnDestroy {

  emailRegex:RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  passwordRegex:RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

  $HEIGHT_CONTAINT_WITH_ERR_MSG: string = "470px";

  messageErreurMail: string = "";
  messageMailAlreadyIn: string = "";
  messageErreurConfirmMail: string = "";

  translateFile: any;

  userUpdateInfosForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      pseudo: new FormControl('', [Validators.required]),
      job: new FormControl('', [Validators.required]),
      mail: new FormControl('', [Validators.required, Validators.pattern(this.emailRegex)]),
      confirmMail: new FormControl('', [Validators.required, Validators.minLength(8)],
    ),
  });

  private unsubscribe$ = new Subject<void>();

  private userDataSubject: BehaviorSubject<UserDataDTO | null> = new BehaviorSubject<UserDataDTO | null>(null);
  userData$: Observable<UserDataDTO | null> = this.userDataSubject.asObservable();

  constructor(
    private userService: UserService,
    private userDataService: UserDataService,
    private translationService: TranslationService,
    private cdr: ChangeDetectorRef,
    private cookieService: CookieService
    ) {}

  ngOnInit(): void {

    this.translateFile = this.translationService.translate('profilUpdate');

    const validateField = () => {

      this.mailMatchValidator();

      const controlMail = this.userUpdateInfosForm.get("mail");

      if (controlMail && controlMail.invalid) {
        this.messageErreurMail = this.translateFile.error_message.err_msg_mail_regex;
      } else {
        this.messageErreurMail = '';
      }

      if (this.messageErreurMail || this.messageErreurConfirmMail) {

        let firstCdkElement = document.querySelector(".cdk-virtual-scroll-content-wrapper") as HTMLElement;
        firstCdkElement.style.height = this.$HEIGHT_CONTAINT_WITH_ERR_MSG;
      }

    };

    this.userUpdateInfosForm.get('mail')?.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => validateField());

    this.userUpdateInfosForm.get('confirmMail')?.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => validateField());

    this.userService.userCurrentData$
    .pipe(
      takeUntil(this.unsubscribe$),
      take(1)
    )
    .subscribe((userData: UserDataDTO | null) => {

      const data = {
        name: userData?.name,
        surname: userData?.surname,
        pseudo: userData?.pseudo,
        job: userData?.job,
        mail: userData?.mail,
        confirmMail: userData?.mail
      }

      this.userUpdateInfosForm.patchValue(data);

      this.userDataSubject.next(userData);
      this.cdr.detectChanges();
    });

  }

  mailMatchValidator(): void {
    const mail = this.userUpdateInfosForm.get('mail');
    const confirmMail = this.userUpdateInfosForm.get('confirmMail');

    this.messageErreurConfirmMail  = "";

    if (mail && confirmMail && mail.value !== '' && confirmMail.value !== '') {
      if (mail.value !== confirmMail.value) {
        confirmMail.setErrors({ MailMismatch: true });
        this.messageErreurConfirmMail = this.translateFile.error_message.err_msg_confirm_mail;

      } else {
        this.messageErreurConfirmMail = "";
        confirmMail.setErrors(null);
      }
    }
  }


  onSubmit(): void {

    console.log((this.cookieService.get('userId')) );

    let userId = (this.cookieService.get('userId'));

    if (this.userUpdateInfosForm.valid && userId) {
      const userData: UpdateUserDTO = {
        id: parseInt(userId),
        name: this.userUpdateInfosForm.get('name')!.value ?? '',
        surname: this.userUpdateInfosForm.get('surname')!.value ?? '',
        pseudo: this.userUpdateInfosForm.get('pseudo')!.value ?? '',
        mail: this.userUpdateInfosForm.get('mail')!.value ?? '',
        job: this.userUpdateInfosForm.get('job')!.value ?? '',
      };

      let test = this.userDataService.updateUser(userData)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data: UpdateUserDTO) => {
        console.log(data);

      },
      (error) => {
        console.log('Full error object:', error);

        if (error && error.error) {
          console.log('Error message:', error.error.message);

          if (error.error.message && error.error.message.includes("Email déjà existant")) {
            this.messageMailAlreadyIn = error.error.message;
          }
        }
      }
      );
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
