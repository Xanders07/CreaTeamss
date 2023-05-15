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
  
    setTimeout(() => {
  




    }, 1000);
  }


  


  ngOnDestroy(): void {
    if (this.userListDataSubscribtion) {
      this.userListDataSubscribtion.unsubscribe();
    }
  }
}
