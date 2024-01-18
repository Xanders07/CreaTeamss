import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// DTO
import { UserDataDTO } from '../../../../../models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ProfilComponent implements OnInit, OnDestroy {

  userData: UserDataDTO | null = null;
  private dataRouteUserSubscription: Subscription | undefined;

  constructor(private activeRoute: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.dataRouteUserSubscription = this.activeRoute.data.subscribe(({ userData }) => {
      this.userData = userData;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    if (this.dataRouteUserSubscription) {
      this.dataRouteUserSubscription.unsubscribe();
    }
  }
}
