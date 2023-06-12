import { createReducer, on } from '@ngrx/store';
import * as actions from '../actions/diseases.actions';
import { DiseaseDto, ServerResponse, SpeciesDto } from 'app/web-api-client';

export interface DiseaseState {
    data?: DiseaseDto[] | null;
    entry?: DiseaseDto | null;
    species?: SpeciesDto[] | null;
    loading: boolean;
    loaded: boolean;
    feedback?: ServerResponse | any | null;
}

const initialState: DiseaseState = {
    data: [],
    entry: null,
    species: [],
    loading: false,
    loaded: false,
    feedback: null,
};

export const diseaseReducer = createReducer(
    initialState,
    on(actions.addDisease, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.addDiseaseSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        data: [...state.data, payload],
    })),
    on(actions.updateDisease, (state, { payload }) => ({
        ...state,
        feedback: null,
        items: state.data.map((e) => (e.id === payload.id ? payload : e)),
    })),
    on(actions.deleteDisease, (state, { payload }) => ({
        ...state,
        feedback: null,
        data: state.data.filter((e) => e.id !== payload),
    })),
    on(actions.loadDiseases, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.loadDiseasesSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        loading: false,
        data: payload,
    })),
    on(actions.loadSpecies, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.loadSpeciesSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        loading: false,
        species: payload,
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
