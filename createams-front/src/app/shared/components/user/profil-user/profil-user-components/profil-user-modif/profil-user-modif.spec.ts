import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifUserProfilComponent } from './profil-user-modif';

describe('ModifUserProfilComponent', () => {
  let component: ModifUserProfilComponent;
  let fixture: ComponentFixture<ModifUserProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifUserProfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifUserProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
