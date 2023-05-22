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


<<<<<<< HEAD
swapdivs(event: Event) : void {
  

    const target = event.target as HTMLElement 

      if (target?.id !== "id2") {

        let elementTransition = false

        target.classList.add("transition1")
        target.classList.add("transition-y-negatif")

         elementTransition = true 

          if (elementTransition) {

            
            
             
          target.classList.remove("transition1")
          target.classList.remove("transition-y-negatif")
          target.classList.add("transition2")
          target.classList.add("transition-y-positif")


          }
       
       



      
        
      }
         

          console.log(target?.id);
  
=======
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

>>>>>>> 0418899806506dfbebab8bdfcbafdcbd67fc443a
    setTimeout(() => {
  




    }, 1000);
  }

<<<<<<< HEAD

  
=======
  }

>>>>>>> 0418899806506dfbebab8bdfcbafdcbd67fc443a


  ngOnDestroy(): void {
    if (this.userListDataSubscribtion) {
      this.userListDataSubscribtion.unsubscribe();
    }
  }
}
