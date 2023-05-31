import { createAction, props } from '@ngrx/store';
import { DiseaseDto, IAddDiseaseCommand } from '../../../../web-api-client';

// Load diseases
export const LOAD_DISEASES = `[Reports] Load Diseases`;
export const LOAD_DISEASES_FAIL = `[Reports] Load Diseases Fail`;
export const LOAD_DISEASES_SUCCESS = `[Reports] Load Diseases Success`;

export const loadDiseases = createAction(LOAD_DISEASES);

export const loadDiseasesFail = createAction(
  LOAD_DISEASES_FAIL,
  props<{ payload: string }>()
);

export const loadDiseasesSuccess = createAction(
  LOAD_DISEASES_SUCCESS,
  props<{ payload: DiseaseDto[] }>()
);
