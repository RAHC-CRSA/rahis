import { createAction, props } from '@ngrx/store';
import {
    IAddInstitutionCommand,
    IDeleteInstitutionCommand,
    IUpdateInstitutionCommand,
    InstitutionDto,
    ServerResponse,
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
export const ADD_INSTITUTION_SUCCESS = `[Institutions] Add Institution Success`;

export const addInstitution = createAction(
    ADD_INSTITUTION,
    props<{ payload: IAddInstitutionCommand }>()
);

export const addInstitutionSuccess = createAction(
    ADD_INSTITUTION_SUCCESS,
    props<{ payload: InstitutionDto }>()
);

// Update institution
export const UPDATE_INSTITUTION = `[Institutions] Update Institution`;
export const UPDATE_INSTITUTION_SUCCESS = `[Institutions] Update Institution Success`;

export const updateInstitution = createAction(
    UPDATE_INSTITUTION,
    props<{ payload: IUpdateInstitutionCommand }>()
);

export const updateInstitutionSuccess = createAction(
    UPDATE_INSTITUTION_SUCCESS,
    props<{ payload: InstitutionDto }>()
);

// Delete institution
export const DELETE_INSTITUTION = `[Institutions] Delete Institution`;
export const DELETE_INSTITUTION_SUCCESS = `[Institutions] Delete Institution Success`;

export const deleteInstitution = createAction(
    DELETE_INSTITUTION,
    props<{ payload: IDeleteInstitutionCommand }>()
);

export const deleteInstitutionSuccess = createAction(
    DELETE_INSTITUTION_SUCCESS,
    props<{ payload: number }>()
);

// Set feedback
export const SET_FEEDBACK = '[Institutions] Set Feedback';
export const CLEAR_FEEDBACK = '[Institutions] Clear Feedback';

export const setFeedback = createAction(
    SET_FEEDBACK,
    props<{ payload: ServerResponse }>()
);

export const clearFeedback = createAction(CLEAR_FEEDBACK);
