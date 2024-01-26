import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, map } from 'rxjs';

import { UserDataDTO, UpdateUserDTO } from 'src/app/shared/models/user.model';
import { UserService } from "./../../../user.service";
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-profil-user-modif',
  templateUrl: './profil-user-modif.html',
  styleUrls: ['./profil-user-modif.scss']
})
export class ModifUserProfilComponent implements OnInit {

  emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

  userUpdateInfosForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    pseudo: new FormControl('', [Validators.required]),
    mail: new FormControl('', [Validators.required, Validators.pattern(this.emailRegex)]),
    confirmMail: new FormControl('', [Validators.required, Validators.pattern(this.emailRegex)]),
    job: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.pattern(this.passwordRegex), Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  private userDataSubject: BehaviorSubject<UserDataDTO | null> = new BehaviorSubject<UserDataDTO | null>(null);
  userData$: Observable<UserDataDTO | null> = this.userDataSubject.asObservable();

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.userService.userCurrentData$.subscribe((userData: UserDataDTO | null) => {
      console.log(userData);

      this.userDataSubject.next(userData);
    });

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

}
