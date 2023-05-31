import {
    createFeatureSelector,
    createReducer,
    createSelector,
    on,
} from '@ngrx/store';
import {
    addDisease,
    updateDisease,
    deleteDisease,
    loadDiseasesSuccess,
    featureKey,
    addDiseaseSuccess,
} from '../actions/diseases.actions';
import { DiseaseDto, ServerResponse } from 'app/web-api-client';

export interface DiseaseState {
    data: DiseaseDto[];
    loading: boolean;
    loaded: boolean;
    feedback: ServerResponse | any | null;
}

const initialState: DiseaseState = {
    data: [],
    loading: false,
    loaded: false,
    feedback: null,
};

export const diseaseReducer = createReducer(
    initialState,
    on(addDisease, (state) => ({
        ...state,
        loading: true,
    })),
    on(addDiseaseSuccess, (state, { payload }) => ({
        ...state,
        data: [...state.data, payload],
    })),
    on(updateDisease, (state, { payload }) => ({
        ...state,
        items: state.data.map((e) => (e.id === payload.id ? payload : e)),
    })),
    on(deleteDisease, (state, { payload }) => ({
        ...state,
        data: state.data.filter((e) => e.id !== payload),
    })),
    on(loadDiseasesSuccess, (state, { payload }) => ({
        ...state,
        data: payload,
    }))
);
