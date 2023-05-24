import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalCreateComponent } from './professional-create.component';

describe('ProfessionalCreateComponent', () => {
  let component: ProfessionalCreateComponent;
  let fixture: ComponentFixture<ProfessionalCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessionalCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
