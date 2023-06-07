import { createAction, props } from '@ngrx/store';
import {
    IAddSpeciesCommand,
    IUpdateSpeciesCommand,
    ServerResponse,
    SpeciesDto,
} from 'app/web-api-client';

export const featureKey = 'species';
// Load diseases
export const LOAD_SPECIES = `[Species] Load Species`;
export const LOAD_SPECIES_SUCCESS = `[Species] Load Species Success`;

/// Add disease
export const ADD_SPECIES = `[Species] Add Species`;
export const ADD_SPECIES_SUCCESS = `[Species] Add Species Success`;

export const addSpecies = createAction(
    ADD_SPECIES,
    props<{ payload: IAddSpeciesCommand }>()
);

export const addSpeciesSuccess = createAction(
    ADD_SPECIES_SUCCESS,
    props<{ payload: SpeciesDto }>()
);

export const UPDATE_SPECIES = `[Species] Update Species`;
export const UPDATE_SPECIES_SUCCESS = `[Species] Update Species Success`;

export const updateSpecies = createAction(
    UPDATE_SPECIES,
    props<{ payload: IUpdateSpeciesCommand }>()
);

export const updateSpeciesSuccess = createAction(
    UPDATE_SPECIES_SUCCESS,
    props<{ payload: SpeciesDto }>()
);

export const DELETE_SPECIES = `[Species] Delete Species`;

export const deleteSpecies = createAction(
    DELETE_SPECIES,
    props<{ payload: number }>()
);

export const loadSpecies = createAction(LOAD_SPECIES);

export const loadSpeciesSuccess = createAction(
    LOAD_SPECIES_SUCCESS,
    props<{ payload: SpeciesDto[] }>()
);

// Set feedback
export const SET_FEEDBACK = '[Institutions] Set Feedback';
export const CLEAR_FEEDBACK = '[Institutions] Clear Feedback';

export const setFeedback = createAction(
    SET_FEEDBACK,
    props<{ payload: ServerResponse }>()
);

export const clearFeedback = createAction(CLEAR_FEEDBACK);
