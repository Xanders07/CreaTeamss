import { NgModule } from '@angular/core';
import { SharedModule } from "../../shared/shared.module";
import { DragDropModule } from '@angular/cdk/drag-drop';
import {
  DxResizableModule,
  DxDataGridModule,
  DxTagBoxModule,
  DxCheckBoxModule,
} from 'devextreme-angular';

import { HomePageComponent } from './home-page.component';
import { CommonModule } from '@angular/common';
import { IconeMarkComponent } from './icone-mark/icone-mark/icone-mark.component';

@NgModule({
  declarations: [
    HomePageComponent,
    IconeMarkComponent
    ],
  imports: [
    SharedModule,
    DragDropModule,
    CommonModule,
    DxResizableModule,
    DxDataGridModule,
    DxTagBoxModule,
    DxCheckBoxModule
  ],
  providers: [],
  bootstrap: [HomePageComponent]
})
export class HomePageModule { }
