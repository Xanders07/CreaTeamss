import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';

import { ConnexionDTO } from '../../../../models/user.model';
import { UserDataService } from "../../user-data.service";

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private UserDataService : UserDataService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      identifier: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {

      const userDto: ConnexionDTO = {
        pseudoOrEmail: this.loginForm.get('identifier')?.value,
        password: this.loginForm.get('password')?.value
      };

      this.UserDataService.connectUser(userDto).subscribe(() => {});
    }
  }

}
