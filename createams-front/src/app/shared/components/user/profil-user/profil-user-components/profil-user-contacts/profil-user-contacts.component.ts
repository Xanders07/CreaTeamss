import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profil-user-contacts',
  templateUrl: './profil-user-contacts.component.html',
  styleUrls: ['./profil-user-contacts.component.scss']
})
export class ProfilUserContactsComponent implements OnInit {

  ngOnInit(): void {
    console.log('Test contacts');
  }

}
