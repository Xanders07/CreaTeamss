import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

      if (userData) {
        this.userData = userData;
        this.cdr.detectChanges();

      }
    })
  }

}
