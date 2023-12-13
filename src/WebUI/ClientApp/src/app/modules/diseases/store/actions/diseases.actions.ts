import { createAction, props } from '@ngrx/store';
import {
    DiseaseDto,
    IAddDiseaseCommand,
    IDeleteDiseaseCommand,
    IGetTransBoundaryDiseasesQuery,
    ServerResponse,
    SpeciesDto,
} from '../../../../../app/web-api-client';

export const featureKey = 'disease';

// Load diseases
export const LOAD_DISEASES = `[Diseases] Load Diseases`;
export const LOAD_DISEASES_SUCCESS = `[Diseases] Load Diseases Success`;

export const loadDiseases = createAction(LOAD_DISEASES);

export const loadDiseasesSuccess = createAction(
    LOAD_DISEASES_SUCCESS,
    props<{ payload: DiseaseDto[] }>()
);

// Load transboundary diseases
export const LOAD_TRANSBOUNDARY_DISEASES = `[Diseases] Load TransBoundary Diseases`;
export const LOAD_TRANSBOUNDARY_DISEASES_SUCCESS = `[Diseases] Load TransBoundary Diseases Success`;

export const loadTransBoundaryDiseases = createAction(
    LOAD_TRANSBOUNDARY_DISEASES,
    props<{ payload: IGetTransBoundaryDiseasesQuery }>()
);

// Add disease
export const ADD_DISEASE = `[Diseases] Add Disease`;
export const ADD_DISEASE_SUCCESS = `[Diseases] Add Disease Success`;

export const addDisease = createAction(
    ADD_DISEASE,
    props<{ payload: IAddDiseaseCommand }>()
);

export const addDiseaseSuccess = createAction(
    ADD_DISEASE_SUCCESS,
    props<{ payload: DiseaseDto }>()
);

// Update disease
export const UPDATE_DISEASE = `[Diseases] Update Disease`;
export const updateDisease = createAction(
    UPDATE_DISEASE,
    props<{ payload: DiseaseDto }>()
);

// Delete disease
export const DELETE_DISEASE = `[Diseases] Delete Disease`;
export const DELETE_DISEASE_SUCCESS = `[Diseases] Delete Disease Success`;

export const deleteDisease = createAction(
    DELETE_DISEASE,
    props<{ payload: IDeleteDiseaseCommand }>()
);

export const deleteDiseaseSuccess = createAction(
    DELETE_DISEASE_SUCCESS,
    props<{ payload: number }>()
);

// Load diseases
export const LOAD_SPECIES = `[Diseases] Load Species`;
export const LOAD_SPECIES_SUCCESS = `[Diseases] Load Species Success`;

export const loadSpecies = createAction(LOAD_SPECIES);

export const loadSpeciesSuccess = createAction(
    LOAD_SPECIES_SUCCESS,
    props<{ payload: SpeciesDto[] }>()
);

export const SET_FEEDBACK = `[Diseases] Set Feedback`;
export const CLEAR_FEEDBACK = `[Diseases] Clear Feedback`;

export const setFeedback = createAction(
    SET_FEEDBACK,
    props<{ payload: ServerResponse }>()
);
export const clearFeedback = createAction(CLEAR_FEEDBACK);
