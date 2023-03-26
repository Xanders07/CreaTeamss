import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InscriptionComponent } from './components/user/inscription/inscription.component';
import { SignInComponent } from './components/user/sign-in/sign-in.component';
import { SignOutComponent } from './components/user/sign-out/sign-out.component';

import { UserDto } from "./models/user.model";
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer/footer.component';
import { CreateProjetComponent } from './components/create-projet/create-projet.component';

@NgModule({
  declarations: [
    InscriptionComponent,
    SignInComponent,
    SignOutComponent,
    NavbarComponent,
    FooterComponent,
    CreateProjetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    NavbarComponent,
    FooterComponent
  ],
  providers: [UserDto],
})
export class SharedModule { }
