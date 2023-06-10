import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/species.actions';
import { ServerResponse, SpeciesDto } from 'app/web-api-client';

export interface SpeciesState {
    data?: SpeciesDto[];
    entry?: SpeciesDto | null;
    loading: boolean;
    loaded: boolean;
    feedback?: ServerResponse | null;
}

const initialState: SpeciesState = {
    data: [],
    entry: null,
    loading: false,
    loaded: false,
    feedback: null,
};

export const reducer = createReducer(
    initialState,
    on(actions.addSpecies, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.addSpeciesSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        data: [...state.data, payload],
        loading: false,
    })),
    on(actions.deleteSpecies, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.deleteSpeciesSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        feedback: null,
        data: state.data.filter((e) => e.id != payload),
    })),
    on(actions.loadSpecies, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.loadSpeciesSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        feedback: null,
        data: payload,
    })),
    on(actions.deleteSpecies, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.deleteSpeciesSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        feedback: null,
        data: state.data.filter((e) => e.id != payload),
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
