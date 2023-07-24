import * as actions from '../actions/professionals.actions';
import { createReducer, on } from '@ngrx/store';
import {
    InstitutionDto,
    ParaProfessionalDto,
    ServerResponse,
} from '../../../../web-api-client';

export interface ParaProfessionalsState {
    data?: ParaProfessionalDto[] | null;
    entry?: ParaProfessionalDto | null;
    institutions?: InstitutionDto[] | null;
    loaded: boolean;
    loading: boolean;
    feedback?: ServerResponse | null;
}

export const initialState: ParaProfessionalsState = {
    data: [],
    entry: null,
    institutions: [],
    loaded: false,
    loading: false,
    feedback: null,
};

export const reducer = createReducer(
    initialState,
    on(actions.addParaProfessional, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.addParaProfessionalSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        loading: false,
        data: [...state.data, payload],
    })),
    on(actions.updateParaProfessional, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.updateParaProfessionalSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        loading: false,
        data: state.data.filter((e) => (e.id == payload.id ? payload : e)),
    })),
    on(actions.loadParaProfessionals, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.loadParaProfessionalsSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        loading: false,
        data: payload,
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
        loaded: true,
        institutions: payload,
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
