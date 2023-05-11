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
  listProject: any | undefined;

  constructor(private MesProjetsServiceData: MesProjetsServiceData) { }

  ngOnInit(): void {
  
    let mailUser = 'grozizi@orange.fr';
    this.userListDataSubscribtion = this.MesProjetsServiceData.getProjectsByUser(mailUser).subscribe(dataUser => {
      this.listProject = dataUser;
      console.log(this.listProject);
      
    

    });
  }


toto(project: any) {
  const indexClicked = this.listProject.indexOf(project);
  const temp = this.listProject[2];
  this.listProject[2] = this.listProject[indexClicked];
  this.listProject[indexClicked] = temp;
  console.log(project.project_name);
  console.log(project.description);
  console.log(project.createdAt); // pourquoi on peut pas récuperer la date ?? // 
}

  ngOnDestroy(): void {
    if (this.userListDataSubscribtion) {
      this.userListDataSubscribtion.unsubscribe();
    }
  }
}
