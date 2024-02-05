import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-statut-message',
  templateUrl: './statut-message.component.html',
  styleUrls: ['./statut-message.component.scss']
})
export class StatutMessageComponent implements OnInit {

  @Input() status: string = '';
  @Input() message: string = '';
  @Input() height: string = '';

  ngOnInit(): void {

  }
}
