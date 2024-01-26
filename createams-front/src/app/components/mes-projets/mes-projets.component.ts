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
    });
  }


swapdivs(project: any,id: string) {
  const idSelect = id;
  const idCible = "id2"
  const projectSelect = this.listProject.indexOf(project);
  const projectCible = this.listProject[2];
  this.listProject[2] = this.listProject[projectSelect];
  this.listProject[projectSelect] = projectCible;
  const div1 = document.getElementById(idSelect);
  const div2 = document.getElementById(idCible);
  if (div1 && div2) {
    div1.style.transition = 'opacity 2s, transform 2s';
    div2.style.transition = 'opacity 2s, transform 2s';
    div1.style.opacity = '5%';
    div2.style.opacity = '5%';
    div1.style.transform = 'translateY(-1800px)'
    div2.style.transform = 'translateY(-1800px)'

    setTimeout(() => {
      div1.style.transition = 'opacity 2s, transform 3s';
      div2.style.transition = 'opacity 2s, transform 3s';
      div1.style.opacity = '100%';
      div2.style.opacity = '100%';
      div1.style.transform = 'translateY(0)';
      div2.style.transform = 'translateY(0)';
    }, 1000);
  }

  }



  ngOnDestroy(): void {
    if (this.userListDataSubscribtion) {
      this.userListDataSubscribtion.unsubscribe();
    }
  }
}
