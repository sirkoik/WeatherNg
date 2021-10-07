import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UviComponent } from './uvi.component';

describe('UviComponent', () => {
  let component: UviComponent;
  let fixture: ComponentFixture<UviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UviComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
