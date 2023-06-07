import * as InstitutionActionTypes from '../actions/institutions.actions';
import {
    createReducer,
    on,
    createFeatureSelector,
    createSelector,
} from '@ngrx/store';
import { InstitutionDto, ServerResponse } from '../../../../web-api-client';
import { featureKey } from '../actions/institutions.actions';

export interface InstitutionsState {
    data?: InstitutionDto[] | null;
    loaded: boolean;
    loading: boolean;
    feedback?: ServerResponse | null;
}

export const initialState: InstitutionsState = {
    data: [],
    loaded: false,
    loading: false,
    feedback: null,
};

export const reducer = createReducer(
    initialState,
    on(InstitutionActionTypes.addInstitution, (state) => ({
        ...state,
        loading: true,
    })),
    on(InstitutionActionTypes.addInstitutionSuccess, (state, { payload }) => ({
        ...state,
        data: [...state.data, payload],
        loading: false,
    })),
    on(InstitutionActionTypes.loadInstitutions, (state) => ({
        ...state,
        loading: true,
    })),
    on(
        InstitutionActionTypes.loadInstitutionsSuccess,
        (state, { payload }) => ({
            ...state,
            loading: false,
            data: payload,
        })
    ),
    on(InstitutionActionTypes.setFeedback, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: !payload.isError,
        feedback: payload,
    })),
    on(InstitutionActionTypes.clearFeedback, (state) => ({
        ...state,
        feedback: null,
    }))
);
