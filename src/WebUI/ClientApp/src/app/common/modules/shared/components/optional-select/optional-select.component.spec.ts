import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalSelectComponent } from './optional-select.component';

describe('OptionalSelectComponent', () => {
  let component: OptionalSelectComponent;
  let fixture: ComponentFixture<OptionalSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionalSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionalSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
