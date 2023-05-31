import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { loadDiseasesSuccess } from '../actions/diseases.actions';
import { DiseaseDto } from '../../../../web-api-client';
import { ReportsState } from '..';
import { featureKey } from '../actions';

export interface DiseaseState {
  data: DiseaseDto[];
  loading: boolean;
  loaded: boolean;
  error: string | null;
}

const initialState: DiseaseState = {
  data: [],
  loading: false,
  loaded: false,
  error: null,
};

export const diseasesReducer = createReducer(
  initialState,
  on(loadDiseasesSuccess, (state, { payload }) => ({ ...state, data: payload }))
);

const reportsState = createFeatureSelector<ReportsState>(featureKey);

const diseasesState = createSelector(
  reportsState,
  (state: ReportsState) => state.diseases
);

export const getDiseases = createSelector(
  diseasesState,
  (state: DiseaseState) => state.data
);
