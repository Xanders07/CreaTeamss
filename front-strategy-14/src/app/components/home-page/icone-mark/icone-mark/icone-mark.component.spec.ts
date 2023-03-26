import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconeMarkComponent } from './icone-mark.component';

describe('IconeMarkComponent', () => {
  let component: IconeMarkComponent;
  let fixture: ComponentFixture<IconeMarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconeMarkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconeMarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
