import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import {
  addSpecies,
  updateSpecies,
  deleteSpecies,
  loadSpeciesSuccess,
  featureKey,
  updateSpeciesSuccess,
  updateSpeciesFail,
} from '../actions/species.actions';
import { SpeciesModel as Species } from '../../../../models';

export interface SpeciesState {
  data: Species[];
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
  on(addSpecies, (state, { payload }) => ({
    ...state,
    data: [...state.data, payload],
  })),
  on(updateSpecies, (state) => ({
    ...state,
    loading: true,
  })),
  on(updateSpeciesFail, (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload,
  })),
  on(updateSpeciesSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    data: state.data.map((e) => (e.id === payload.id ? payload : e)),
  })),
  on(deleteSpecies, (state, { payload }) => ({
    ...state,
    data: state.data.filter((e) => e.id !== payload),
  })),
  on(loadSpeciesSuccess, (state, { payload }) => ({ ...state, data: payload }))
);

const speciesState = createFeatureSelector<SpeciesState>(featureKey);

export const getSpecies = createSelector(
  speciesState,
  (state: SpeciesState) => state.data
);
