// Angular
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

// Service
import { UserService } from '../../../user.service';
import { UserDataProfilDTO, UserDTO } from 'src/app/shared/models/user.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-profil-user-contacts',
  templateUrl: './profil-user-contacts.component.html',
  styleUrls: ['./profil-user-contacts.component.scss']
})

export class ProfilUserContactsComponent implements OnInit {

  contactList: UserDTO[] | undefined;

  private unsubscribe$ = new Subject<void>();

  constructor(private userService: UserService,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.userService.userCurrentData$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((userData: UserDataProfilDTO | null) => {

        if (userData?.contacts) {
          this.contactList = userData?.contacts;
          console.log(this.contactList);

          this.cdr.detectChanges();

        }
      });

  }

}
