import * as InstitutionActionTypes from '../actions/institutions.actions';
import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { InstitutionDto } from '../../../../web-api-client';
import { featureKey } from '../actions/institutions.actions';

export interface InstitutionsState {
  data?: InstitutionDto[] | null;
  loaded: boolean;
  loading: boolean;
  error: string | null;
}

export const initialState: InstitutionsState = {
  data: null,
  loaded: false,
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(InstitutionActionTypes.addInstitution, (state) => ({
    ...state,
    loading: true,
  })),
  on(InstitutionActionTypes.addInstitutionSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(InstitutionActionTypes.loadInstitutions, (state) => ({
    ...state,
    loading: true,
  })),
  on(InstitutionActionTypes.loadInstitutionsFail, (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload,
  })),
  on(InstitutionActionTypes.loadInstitutionsSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    data: payload,
  }))
);

const institutionsState = createFeatureSelector<InstitutionsState>(featureKey);

export const getInstitutions = createSelector(
  institutionsState,
  (state: InstitutionsState) => state.data
);
