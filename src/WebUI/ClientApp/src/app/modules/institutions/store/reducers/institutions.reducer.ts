import * as actions from '../actions/institutions.actions';
import { createReducer, on } from '@ngrx/store';
import { InstitutionDto, ServerResponse } from '../../../../web-api-client';

export interface InstitutionsState {
    data?: InstitutionDto[] | null;
    entry?: InstitutionDto | null;
    loaded: boolean;
    loading: boolean;
    feedback?: ServerResponse | null;
}

export const initialState: InstitutionsState = {
    data: [],
    entry: null,
    loaded: false,
    loading: false,
    feedback: null,
};

export const reducer = createReducer(
    initialState,
    on(actions.addInstitution, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.addInstitutionSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        data: [...state.data, payload],
        loading: false,
    })),
    on(actions.deleteInstitution, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.deleteInstitutionSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        loading: false,
        data: state.data.filter((e) => e.id != payload),
    })),
    on(actions.loadInstitutions, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.loadInstitutionsSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        loading: false,
        data: payload,
    })),
    on(actions.setFeedback, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: !payload.isError,
        feedback: payload,
    })),
    on(actions.clearFeedback, (state) => ({
        ...state,
        feedback: null,
    }))
);
