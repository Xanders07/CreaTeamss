import { Component, OnInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-statut-message',
  templateUrl: './statut-message.component.html',
  styleUrls: ['./statut-message.component.scss']
})
export class StatutMessageComponent implements OnInit, OnDestroy {

  @Input() status: string = '';
  @Input() message: string = '';

  ngOnInit(): void {


  }

  ngOnDestroy(): void {

  }

}
