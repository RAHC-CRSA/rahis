import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureKey } from '../actions';
import { ParaProfessionalsState } from '../reducers';

const professionalsState =
    createFeatureSelector<ParaProfessionalsState>(featureKey);

export const getParaProfessionals = createSelector(
    professionalsState,
    (state: ParaProfessionalsState) => state.data
);

export const getParaProfessionalsLoading = createSelector(
    professionalsState,
    (state: ParaProfessionalsState) => state.loading
);

export const getInstitutions = createSelector(
    professionalsState,
    (state: ParaProfessionalsState) => state.institutions
);
