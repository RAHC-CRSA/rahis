import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { SpeciesDto } from '../../../../web-api-client';
import { ReportsState } from '..';
import { featureKey, loadSpeciesSuccess } from '../actions';

export interface SpeciesState {
  data: SpeciesDto[];
  loading: boolean;
  loaded: boolean;
  error: string | null;
}

const initialState: SpeciesState = {
  data: [],
  loading: false,
  loaded: false,
  error: null,
};

export const speciesReducer = createReducer(
  initialState,
  on(loadSpeciesSuccess, (state, { payload }) => ({ ...state, data: payload }))
);

const reportsState = createFeatureSelector<ReportsState>(featureKey);

const speciesState = createSelector(
  reportsState,
  (state: ReportsState) => state.species
);

export const getSpecies = createSelector(
  speciesState,
  (state: SpeciesState) => state.data
);
