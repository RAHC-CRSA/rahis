import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportVerifyComponent } from './report-verify.component';

describe('ReportVerifyComponent', () => {
  let component: ReportVerifyComponent;
  let fixture: ComponentFixture<ReportVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportVerifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
