import { createAction, props } from '@ngrx/store';
import { SpeciesDto } from '../../../../web-api-client';

// Load diseases
export const LOAD_SPECIES = `[Reports] Load Species`;
export const LOAD_SPECIES_FAIL = `[Reports] Load Species Fail`;
export const LOAD_SPECIES_SUCCESS = `[Reports] Load Species Success`;

export const loadSpecies = createAction(LOAD_SPECIES);

export const loadSpeciesFail = createAction(
  LOAD_SPECIES_FAIL,
  props<{ payload: string }>()
);

export const loadSpeciesSuccess = createAction(
  LOAD_SPECIES_SUCCESS,
  props<{ payload: SpeciesDto[] }>()
);
