import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SpeciesState } from '../reducers';
import { featureKey } from '../actions';

const speciesState = createFeatureSelector<SpeciesState>(featureKey);

export const getSpecies = createSelector(
    speciesState,
    (state: SpeciesState) => state.data
);

export const getSpeciesLoading = createSelector(
    speciesState,
    (state: SpeciesState) => state.loading
);

export const getSpeciesLoaded = createSelector(
    speciesState,
    (state: SpeciesState) => state.loaded
);

export const getFeedback = createSelector(
    speciesState,
    (state: SpeciesState) => state.feedback
);
