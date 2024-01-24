import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnexionComponentPage } from './connexion-page.component';

describe('SignInComponent', () => {
  let component: ConnexionComponentPage;
  let fixture: ComponentFixture<ConnexionComponentPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnexionComponentPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnexionComponentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
