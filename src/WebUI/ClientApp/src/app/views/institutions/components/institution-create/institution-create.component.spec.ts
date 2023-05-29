import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionCreateComponent } from './institution-create.component';

describe('InstitutionCreateComponent', () => {
  let component: InstitutionCreateComponent;
  let fixture: ComponentFixture<InstitutionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutionCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstitutionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
