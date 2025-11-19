/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DeanWordComponent } from './dean-word.component';

describe('DeanWordComponent', () => {
  let component: DeanWordComponent;
  let fixture: ComponentFixture<DeanWordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeanWordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeanWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
