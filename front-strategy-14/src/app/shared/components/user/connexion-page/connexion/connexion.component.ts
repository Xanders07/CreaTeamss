import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      identifier: new FormControl(''),
      password: new FormControl('')
    });
  }

  onSubmit() {

    const formValues = this.loginForm.value;
     
    this.http.post<any>('http://localhost:5000/api/verifyUser', {
      pseudo: formValues.identifier,
      password: formValues.password
    }).subscribe(response => {
      if (response) {
         
        //  la je convertie en json et je stocke dans le local storage 
        localStorage.setItem('userSession', JSON.stringify({
          pseudo: response.pseudo,
          password: response.password
          
        }));
        console.log(response);
      } else {
        console.log('pas dutilisateurs avec ces indentifiants');
      }
    }, error => {
      console.log('erreur lors de la recupération', error);
    });
  }
}
