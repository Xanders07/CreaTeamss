import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {
  DxResizableModule,
  DxDataGridModule,
  DxTagBoxModule,
  DxCheckBoxModule,
} from 'devextreme-angular';
@Component({
  selector: 'app-icone-mark',
  templateUrl: './icone-mark.component.html',
  styleUrls: ['./icone-mark.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class IconeMarkComponent implements OnInit {

  @Input() imgSrc: string | undefined;

  handleValues: string[] = ['left', 'top', 'right', 'bottom'];

  keepAspectRatio = true;

  handles: string[] = ['left', 'top', 'right', 'bottom'];


  resizableClasses = '';

  constructor() { }

  ngOnInit(): void {
  }

  handlesValueChange({ value }: any) {
    this.resizableClasses = this.handleValues.reduce((acc, handle) => {
      const newClass = value.includes(handle) ? '' : ` no-${handle}-handle`;
      return acc + newClass;
    }, 'dx-resizable');
  }

}
