import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesDetailComponent } from './species-detail.component';

describe('SpeciesDetailComponent', () => {
  let component: SpeciesDetailComponent;
  let fixture: ComponentFixture<SpeciesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpeciesDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeciesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
