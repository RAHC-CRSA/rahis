import { createReducer, on } from '@ngrx/store';
import {
    addSpecies,
    loadSpeciesSuccess,
    addSpeciesSuccess,
    loadSpecies,
    setFeedback,
    clearFeedback,
} from '../actions/species.actions';
import { SpeciesDto } from 'app/web-api-client';

export interface SpeciesState {
    data: SpeciesDto[];
    loading: boolean;
    loaded: boolean;
    error: string | null;
}

const initialState: SpeciesState = {
    data: [],
    loading: false,
    loaded: false,
    error: null,
};

export const reducer = createReducer(
    initialState,
    on(addSpecies, (state) => ({
        ...state,
        loading: true,
    })),
    on(addSpeciesSuccess, (state, { payload }) => ({
        ...state,
        data: [...state.data, payload],
        loading: false,
    })),
    on(loadSpecies, (state) => ({
        ...state,
        loading: true,
    })),
    on(loadSpeciesSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        data: payload,
    })),
    on(setFeedback, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: !payload.isError,
        feedback: payload,
    })),
    on(clearFeedback, (state) => ({
        ...state,
        feedback: null,
    }))
);
