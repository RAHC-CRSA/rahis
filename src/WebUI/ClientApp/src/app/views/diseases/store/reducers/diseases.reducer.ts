import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import {
  addDisease,
  updateDisease,
  deleteDisease,
  loadDiseasesSuccess,
  featureKey,
} from '../actions/diseases.actions';
import { DiseaseModel as Disease } from '../../../../models';

export interface DiseaseState {
  data: Disease[];
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

export const diseaseReducer = createReducer(
  initialState,
  on(addDisease, (state, { payload }) => ({
    ...state,
    data: [...state.data, payload],
  })),
  on(updateDisease, (state, { payload }) => ({
    ...state,
    items: state.data.map((e) => (e.id === payload.id ? payload : e)),
  })),
  on(deleteDisease, (state, { payload }) => ({
    ...state,
    data: state.data.filter((e) => e.id !== payload),
  })),
  on(loadDiseasesSuccess, (state, { payload }) => ({ ...state, data: payload }))
);

const diseaseState = createFeatureSelector<DiseaseState>(featureKey);

export const getDiseases = createSelector(
  diseaseState,
  (state: DiseaseState) => state.data
);
