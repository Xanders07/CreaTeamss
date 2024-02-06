import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilUserProjectsComponent } from './profil-user-projects.component';

describe('ProfilUserProjectsComponent', () => {
  let component: ProfilUserProjectsComponent;
  let fixture: ComponentFixture<ProfilUserProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilUserProjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilUserProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
