import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICreateReportCommand } from 'src/app/web-api-client';
import { ReportsState } from '../../store';
import { createReport } from '../../store/actions';

@Component({
  selector: 'app-report-create',
  templateUrl: './report-create.component.html',
  styleUrls: ['./report-create.component.scss'],
})
export class ReportCreateComponent implements OnInit {
  formStep: number = 1;
  stepTitle: string;
  stepDescription: string;

  steps = [
    {
      title: 'Location',
      description: 'Country & region of occurrence',
    },
    {
      title: 'Disease Info',
      description: 'Species & disease information',
    },
    {
      title: 'Occurrence',
      description: 'Occurrence status & recorrence',
    },
    {
      title: 'Infection Info',
      description: 'Infestation effects & impact',
    },
    {
      title: 'Treatment Info',
      description: 'Treatment actions & measures',
    },
    {
      title: 'Treatment Source',
      description: 'Treatment sources',
    },
  ];

  formValues = {
    reportId: null,
    country: '',
    region: '',
    disease: '',
    species: '',
    newOccurrence: false,
    occurrence: '',
    exposed: '',
    infected: '',
    mortality: '',
  };

  constructor(private store: Store<ReportsState>) {}

  ngOnInit() {}

  next(formData: any) {
    if (this.formStep == 6) return;

    console.log({ formData, currentValues: this.formValues });

    if (this.formStep == 1) {
      // Capture form values
      this.formValues.country = formData.country;
      this.formValues.region = formData.region;

      this.formStep++;
      return;
    }

    if (this.formStep == 2) {
      // Capture form values
      this.formValues.disease = formData.disease;
      this.formValues.species = formData.species;

      // console.log({ values: this.formValues });

      this.formStep++;
      return;
    }

    if (this.formStep == 3) {
      // Capture form values
      this.formValues.newOccurrence = formData.newOccurrence;
      this.formValues.occurrence =
        formData.occurrence == 'other' ? undefined : formData.occurrence;

      console.log('Current Value', { current: this.formValues });

      this.formStep++;
      return;
    }

    if (this.formStep == 4) {
      // Capture form values
      this.formValues.exposed = formData.numberExposed;
      this.formValues.infected = formData.numberInfected;
      this.formValues.mortality = formData.mortality;

      // const occurrence =
      //   formData.occurrence == 'other'
      //     ? undefined
      //     : parseInt(this.formValues.occurrence);

      // console.log('Occurrence: ', { occurrence, value: formData.occurence });

      const payload: ICreateReportCommand = {
        regionId: parseInt(this.formValues.region),
        diseaseId: parseInt(this.formValues.disease),
        speciesId: parseInt(this.formValues.species),
        occurrenceId: parseInt(this.formValues.occurrence),
        numberExposed: parseInt(this.formValues.exposed),
        numberInfected: parseInt(this.formValues.infected),
        mortality: parseInt(this.formValues.mortality),
      };

      this.store.dispatch(createReport({ payload }));

      this.formStep++;
      return;
    }

    if (this.formStep == 5) {
      // Capture form values
      this.formStep++;
      return;
    }
  }

  previous() {
    if (this.formStep == 1) return;
    this.formStep--;
  }

  submit() {
    console.log({ data: this.formValues });
  }

  cancel() {}
}
