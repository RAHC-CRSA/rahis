import { createAction, props } from '@ngrx/store';
import {
  ParaProfessionalDto,
  IAddParaProfessionalCommand,
  InstitutionDto,
} from '../../../../web-api-client';

export const featureKey = 'para-rofessionals';

// Load para-professionals
export const LOAD_PARA_PROFESSIONALS = `[ParaProfessionals] Load ParaProfessionals`;
export const LOAD_PARA_PROFESSIONALS_FAIL = `[ParaProfessionals] Load ParaProfessionals Fail`;
export const LOAD_PARA_PROFESSIONALS_SUCCESS = `[ParaProfessionals] Load ParaProfessionals Success`;

export const loadParaProfessionals = createAction(
  LOAD_PARA_PROFESSIONALS,
  props<{ payload?: number | undefined }>()
);
export const loadParaProfessionalsFail = createAction(
  LOAD_PARA_PROFESSIONALS_FAIL,
  props<{ payload: string }>()
);
export const loadParaProfessionalsSuccess = createAction(
  LOAD_PARA_PROFESSIONALS_SUCCESS,
  props<{ payload: ParaProfessionalDto[] }>()
);

// Add para-professional
export const ADD_PARA_PROFESSIONAL = `[ParaProfessionals] Add ParaProfessional`;
export const ADD_PARA_PROFESSIONAL_FAIL = `[ParaProfessionals] Add ParaProfessional Fail`;
export const ADD_PARA_PROFESSIONAL_SUCCESS = `[ParaProfessionals] Add ParaProfessional Success`;

export const addParaProfessional = createAction(
  ADD_PARA_PROFESSIONAL,
  props<{ payload: IAddParaProfessionalCommand }>()
);
export const addParaProfessionalFail = createAction(
  ADD_PARA_PROFESSIONAL_FAIL,
  props<{ payload: string }>()
);
export const addParaProfessionalSuccess = createAction(
  ADD_PARA_PROFESSIONAL_SUCCESS,
  props<{ payload: ParaProfessionalDto }>()
);

// Get institutions
export const LOAD_INSTITUTIONS = `[ParaProfessionals] Load Institutions`;
export const LOAD_INSTITUTIONS_FAIL = `[ParaProfessionals] Load Institutions Fail`;
export const LOAD_INSTITUTIONS_SUCCESS = `[ParaProfessionals] Load Institutions Success`;

export const loadInstitutions = createAction(LOAD_INSTITUTIONS);
export const loadInstitutionsFail = createAction(
  LOAD_INSTITUTIONS_FAIL,
  props<{ payload: string }>()
);
export const loadInstitutionsSuccess = createAction(
  LOAD_INSTITUTIONS_SUCCESS,
  props<{ payload: InstitutionDto[] }>()
);
