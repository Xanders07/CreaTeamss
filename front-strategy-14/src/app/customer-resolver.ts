import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, skip } from 'rxjs/operators';

// Services
import { UserService } from "./shared/components/user/user.service";

// DTO
import { UserDataDTO } from "./shared/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerResolver implements Resolve<UserDataDTO> {

  constructor(private userService: UserService) {}

  resolve(): Observable<UserDataDTO> {
    return this.userService.userCurrentData$.pipe(
      take(1),
      map((user: UserDataDTO | null) => {
        console.log(user);
        return user || {};
      })
    );
  }
}
