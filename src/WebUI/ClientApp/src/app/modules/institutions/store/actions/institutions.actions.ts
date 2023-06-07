import { createAction, props } from '@ngrx/store';
import {
  IAddInstitutionCommand,
  InstitutionDto,
} from '../../../../web-api-client';

export const featureKey = 'institutions';

// Load regions
export const LOAD_INSTITUTIONS = `[Institutions] Load Institutions`;
export const LOAD_INSTITUTIONS_FAIL = `[Institutions] Load Institutions Fail`;
export const LOAD_INSTITUTIONS_SUCCESS = `[Institutions] Load Institutions Success`;

export const loadInstitutions = createAction(LOAD_INSTITUTIONS);
export const loadInstitutionsFail = createAction(
  LOAD_INSTITUTIONS_FAIL,
  props<{ payload: string }>()
);
export const loadInstitutionsSuccess = createAction(
  LOAD_INSTITUTIONS_SUCCESS,
  props<{ payload: InstitutionDto[] }>()
);

// Add institution
export const ADD_INSTITUTION = `[Institutions] Add Institution`;
export const ADD_INSTITUTION_FAIL = `[Institutions] Add Institution Fail`;
export const ADD_INSTITUTION_SUCCESS = `[Institutions] Add Institution Success`;

export const addInstitution = createAction(
  ADD_INSTITUTION,
  props<{ payload: IAddInstitutionCommand }>()
);
export const addInstitutionFail = createAction(
  ADD_INSTITUTION_FAIL,
  props<{ payload: string }>()
);
export const addInstitutionSuccess = createAction(
  ADD_INSTITUTION_SUCCESS,
  props<{ payload: InstitutionDto }>()
);
