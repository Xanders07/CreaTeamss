// Angular
import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';

// Services
import { UserService } from '../../../user.service';

// DTO
import { UserDataDTO, ProjectDTO } from 'src/app/shared/models/user.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-profil-user-projects',
  templateUrl: './profil-user-projects.component.html',
  styleUrls: ['./profil-user-projects.component.scss'],
  host: {
    class: 'h-100 w-100'
  }
})
export class ProfilUserProjectsComponent implements OnInit, OnDestroy {

  projectsList: ProjectDTO[] | undefined;

  private unsubscribe$ = new Subject<void>();

  constructor(private userService : UserService, private cdr: ChangeDetectorRef ) {

  }

  ngOnInit(): void {
    console.log('Test projects');

    this.cdr.detectChanges();

    this.userService.userCurrentData$
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((userData: UserDataDTO | null) => {
      console.log(userData?.projects);
      if (userData?.projects) {
        this.projectsList = userData?.projects;
      }
    });

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
