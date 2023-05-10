import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  loginForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      identifier: new FormControl(''),
      password: new FormControl('')
    });
  }

  onSubmit() {
    // Logique de soumission du formulaire
    console.log(this.loginForm.value);
  }

}
