import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullNameConcatPipe'
})

export class FullNameConcatPipe implements PipeTransform {

  transform(user: { firstName: string, lastName: string }, separator: string = ' '): string {

    return `${user.firstName}${separator}${user.lastName}`;

  }

}
