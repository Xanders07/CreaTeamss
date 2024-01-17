import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// DTO
import { UserDataDTO } from '../../../../../models/user.model';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilComponent implements OnInit{

  userData: UserDataDTO | null = null;

  constructor(private activeRoute: ActivatedRoute,  private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.activeRoute.data.subscribe(({ userData }) => {
      console.log(userData);
      if (userData) {
        this.cdr.detectChanges();
        this.userData = userData;
      }
    })
  }

}
