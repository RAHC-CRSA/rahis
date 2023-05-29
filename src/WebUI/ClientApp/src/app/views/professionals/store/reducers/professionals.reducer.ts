import * as ProfessionalActionTypes from '../actions/professionals.actions';
import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import {
  InstitutionDto,
  ParaProfessionalDto,
} from '../../../../web-api-client';
import { featureKey } from '../actions/professionals.actions';

export interface ParaProfessionalsState {
  data?: ParaProfessionalDto[] | null;
  institutions?: InstitutionDto[] | null;
  loaded: boolean;
  loading: boolean;
  error: string | null;
}

export const initialState: ParaProfessionalsState = {
  data: null,
  institutions: [],
  loaded: false,
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(ProfessionalActionTypes.addParaProfessional, (state) => ({
    ...state,
    loading: true,
  })),
  on(ProfessionalActionTypes.addParaProfessionalSuccess, (state) => ({
    ...state,
    loading: false,
  })),
  on(ProfessionalActionTypes.loadParaProfessionals, (state) => ({
    ...state,
    loading: true,
  })),
  on(
    ProfessionalActionTypes.loadParaProfessionalsFail,
    (state, { payload }) => ({
      ...state,
      loading: false,
      error: payload,
    })
  ),
  on(
    ProfessionalActionTypes.loadParaProfessionalsSuccess,
    (state, { payload }) => ({
      ...state,
      loading: false,
      data: payload,
    })
  ),
  on(ProfessionalActionTypes.loadInstitutions, (state) => ({
    ...state,
    loading: true,
  })),
  on(ProfessionalActionTypes.loadInstitutionsFail, (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload,
  })),
  on(ProfessionalActionTypes.loadInstitutionsSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    institutions: payload,
  }))
);

const professionalsState =
  createFeatureSelector<ParaProfessionalsState>(featureKey);

export const getParaProfessionals = createSelector(
  professionalsState,
  (state: ParaProfessionalsState) => state.data
);

export const getInstitutions = createSelector(
  professionalsState,
  (state: ParaProfessionalsState) => state.institutions
);
