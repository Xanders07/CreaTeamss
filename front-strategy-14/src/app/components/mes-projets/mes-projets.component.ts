import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MesProjetsServiceData } from './mes-projets.service-data';

@Component({
  selector: 'app-mes-projets',
  templateUrl: './mes-projets.component.html',
  styleUrls: ['./mes-projets.component.scss']
})
export class MesProjetsComponent implements OnInit, OnDestroy {
  private userListDataSubscribtion: Subscription | undefined;

  constructor(private MesProjetsServiceData: MesProjetsServiceData) { }

  ngOnInit(): void {
    let result;
    let mailUser = 'test@gmail.com';
    this.userListDataSubscribtion = this.MesProjetsServiceData.getProjectsByUser(mailUser).subscribe(dataUser => {
      result = dataUser;
      console.log(result);

    });
  }


  toto(): void {
    console.log("moncul");
  }

  ngOnDestroy(): void {
    if (this.userListDataSubscribtion) {
      this.userListDataSubscribtion.unsubscribe();
    }
  }
}
