import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilUserContactsComponent } from './profil-user-contacts.component';

describe('UserContactsComponent', () => {
  let component: ProfilUserContactsComponent;
  let fixture: ComponentFixture<ProfilUserContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilUserContactsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfilUserContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
