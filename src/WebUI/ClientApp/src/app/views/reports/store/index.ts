import { combineReducers } from '@ngrx/store';
import * as diseasesReducer from './reducers/diseases.reducer';
import * as reportsReducer from './reducers/reports.reducer';
import * as speciesReducer from './reducers/species.reducer';

export interface ReportsState {
  information: reportsReducer.ReportState;
  diseases: diseasesReducer.DiseaseState;
  species: speciesReducer.SpeciesState;
}

export const reducer = combineReducers<ReportsState>({
  information: reportsReducer.reportsReducer,
  diseases: diseasesReducer.diseasesReducer,
  species: speciesReducer.speciesReducer,
});
