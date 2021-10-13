import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectMultipleControlValueAccessor } from '@angular/forms';

import { UviComponent } from './uvi.component';

const setupColor = (component: UviComponent, level: number): void => {
  component.level = level;
  component.uviLevel = component.getUviLevel();
};

describe('UviComponent', () => {
  let component: UviComponent;
  let fixture: ComponentFixture<UviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UviComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be green if uvi is less than 3', () => {
    setupColor(component, 0);
    expect(component.uviLevel.colorClass).toEqual('uvi-green');

    setupColor(component, 1);
    expect(component.uviLevel.colorClass).toEqual('uvi-green');

    setupColor(component, 2.5);
    expect(component.uviLevel.colorClass).toEqual('uvi-green');
  });

  it('should be yellow if uvi is between 3 and 6', () => {
    setupColor(component, 3);
    expect(component.uviLevel.colorClass).toEqual('uvi-yellow');

    setupColor(component, 4);
    expect(component.uviLevel.colorClass).toEqual('uvi-yellow');

    setupColor(component, 5.7);
    expect(component.uviLevel.colorClass).toEqual('uvi-yellow');
  });

  it('should be orange if uvi is between 6 and 8', () => {
    setupColor(component, 6);
    expect(component.uviLevel.colorClass).toEqual('uvi-orange');

    setupColor(component, 7);
    expect(component.uviLevel.colorClass).toEqual('uvi-orange');

    setupColor(component, 7.2);
    expect(component.uviLevel.colorClass).toEqual('uvi-orange');
  });

  it('should be red if uvi is between 8 and 11', () => {
    setupColor(component, 8);
    expect(component.uviLevel.colorClass).toEqual('uvi-red');

    setupColor(component, 9);
    expect(component.uviLevel.colorClass).toEqual('uvi-red');

    setupColor(component, 10.5);
    expect(component.uviLevel.colorClass).toEqual('uvi-red');
  });

  it('should be purple if uvi is 11 or above', () => {
    setupColor(component, 11);
    expect(component.uviLevel.colorClass).toEqual('uvi-purple');

    setupColor(component, 12);
    expect(component.uviLevel.colorClass).toEqual('uvi-purple');

    setupColor(component, 15);
    expect(component.uviLevel.colorClass).toEqual('uvi-purple');
  });
});
