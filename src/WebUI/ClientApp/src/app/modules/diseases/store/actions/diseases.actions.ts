import { createAction, props } from '@ngrx/store';
import {
    DiseaseDto,
    IAddDiseaseCommand,
    ServerResponse,
} from '../../../../../app/web-api-client';

export const featureKey = 'disease';
// Load diseases
export const LOAD_DISEASES = `[Disease] Load Diseases`;
export const LOAD_DISEASES_SUCCESS = `[Disease] Load Diseases Success`;

/// Add disease
export const ADD_DISEASE = `[Disease] Add Disease`;
export const ADD_DISEASE_SUCCESS = `[Disease] Add Disease Success`;

export const addDisease = createAction(
    ADD_DISEASE,
    props<{ payload: IAddDiseaseCommand }>()
);

export const addDiseaseSuccess = createAction(
    ADD_DISEASE_SUCCESS,
    props<{ payload: DiseaseDto }>()
);

export const UPDATE_DISEASE = `[Disease] Update Disease`;
export const DELETE_DISEASE = `[Disease] Delete Disease`;

export const updateDisease = createAction(
    UPDATE_DISEASE,
    props<{ payload: DiseaseDto }>()
);

export const deleteDisease = createAction(
    DELETE_DISEASE,
    props<{ payload: number }>()
);

export const loadDiseases = createAction(LOAD_DISEASES);

export const loadDiseasesSuccess = createAction(
    LOAD_DISEASES_SUCCESS,
    props<{ payload: DiseaseDto[] }>()
);

export const SET_FEEDBACK = `[Disease] Set Feedback`;
export const CLEAR_FEEDBACK = `[Disease] Clear Feedback`;

export const setFeedback = createAction(
    SET_FEEDBACK,
    props<{ payload: ServerResponse }>()
);
export const clearFeedback = createAction(CLEAR_FEEDBACK);
