import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, take, takeUntil } from 'rxjs';

import { UserDataDTO, UpdateUserDTO } from 'src/app/shared/models/user.model';
import { UserService } from "./../../../user.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslationService } from 'src/app/shared/translates/translate-service';
import { UserDataService } from '../../../user-data.service';


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
      console.log({'User Data for profil modif': userData});

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
    console.log(mail?.value);
    console.log(confirmMail?.value);

    if (mail && confirmMail && mail.value !== '' && confirmMail.value !== '') {
      if (mail.value !== confirmMail.value) {
        confirmMail.setErrors({ MailMismatch: true });
        this.messageErreurConfirmMail = this.translateFile.error_message.err_msg_confirm_mail;
        console.log(this.translateFile.error_message);

      } else {
        this.messageErreurConfirmMail = "";
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
      };

      this.userDataService.updateUser(userData);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
