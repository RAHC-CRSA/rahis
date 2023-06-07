import * as ProfessionalActionTypes from '../actions/professionals.actions';
import { createReducer, on } from '@ngrx/store';
import {
    InstitutionDto,
    ParaProfessionalDto,
    ServerResponse,
} from '../../../../web-api-client';

export interface ParaProfessionalsState {
    data?: ParaProfessionalDto[] | null;
    institutions?: InstitutionDto[] | null;
    loaded: boolean;
    loading: boolean;
    feedback: ServerResponse | null;
}

export const initialState: ParaProfessionalsState = {
    data: [],
    institutions: [],
    loaded: false,
    loading: false,
    feedback: null,
};

export const reducer = createReducer(
    initialState,
    on(ProfessionalActionTypes.addParaProfessional, (state) => ({
        ...state,
        loading: true,
    })),
    on(
        ProfessionalActionTypes.addParaProfessionalSuccess,
        (state, { payload }) => ({
            ...state,
            loading: false,
            data: [...state.data, payload],
        })
    ),
    on(ProfessionalActionTypes.loadParaProfessionals, (state) => ({
        ...state,
        loading: true,
    })),
    on(
        ProfessionalActionTypes.loadParaProfessionalsSuccess,
        (state, { payload }) => ({
            ...state,
            loading: false,
            data: payload,
        })
    ),
    on(ProfessionalActionTypes.loadInstitutions, (state) => ({
        ...state,
        loading: true,
    })),
    on(
        ProfessionalActionTypes.loadInstitutionsSuccess,
        (state, { payload }) => ({
            ...state,
            loading: false,
            loaded: true,
            institutions: payload,
        })
    ),
    on(ProfessionalActionTypes.setFeedback, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: !payload.isError,
        feedback: payload,
    })),
    on(ProfessionalActionTypes.clearFeedback, (state) => ({
        ...state,
        feedback: null,
    }))
);
