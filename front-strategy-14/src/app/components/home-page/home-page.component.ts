import { Component, OnInit } from '@angular/core';
import { HomePageServiceData } from "./home-page.service-data";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})


export class HomePageComponent implements OnInit {

  constructor(private HomePageServiceData: HomePageServiceData) { }

  ngOnInit(): void {
    let result;
    let Idtest = 1;
    let userCurrentData = this.HomePageServiceData.getCurrentUser(Idtest).subscribe(data => {
      console.log(data);
      result = data;
    });

    // this.userService.createUser(this.userInscriptionData).subscribe(() => {});
  }

}
