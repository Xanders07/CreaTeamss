import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatutMessageComponent } from './statut-message.component';

describe('StatutMessageComponent', () => {
  let component: StatutMessageComponent;
  let fixture: ComponentFixture<StatutMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatutMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatutMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
