// Module
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatMenuModule } from '@angular/material/menu';
import { ToastrModule } from 'ngx-toastr';

// Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer/footer.component';
import { CreateProjetComponent } from '../components/create-projet/create-projet.component';
import { ConnexionComponentPage } from './components/user/connexion-page/connexion-page.component';
import { InscriptionComponent } from './components/user/connexion-page/inscription/inscription.component';
import { ConnexionComponent } from './components/user/connexion-page/connexion/connexion.component';
import { StatutMessageComponent } from './components/statut-message/statut-message.component';
import { ProfilUserComponent } from './components/user/profil-user/profil-user.component';
import { ModifUserProfilComponent } from './components/user/profil-user/profil-user-components/profil-user-modif/profil-user-modif';
import { ProfilUserProjectsComponent } from './components/user/profil-user/profil-user-components/profil-user-projects/profil-user-projects.component';

// Pipes
import { ImageGeneratePipe } from './pipes/image-generate.pipe';
import { FullNameConcatPipe } from './pipes/full-name-concat-pipe.pipe';

// DTOs
import { UserDataDTO } from "./models/user.model";

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    CreateProjetComponent,
    ConnexionComponentPage,
    InscriptionComponent,
    ConnexionComponent,
    StatutMessageComponent,
    ProfilUserComponent,
    ModifUserProfilComponent,
    ProfilUserProjectsComponent,
    ImageGeneratePipe,
    FullNameConcatPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule,
    RouterModule,
    MatButtonModule,
    ScrollingModule,
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
    }),
  ],
  exports: [
    NavbarComponent,
    FooterComponent
  ],
  providers: [UserDataDTO],
})
export class SharedModule { }
