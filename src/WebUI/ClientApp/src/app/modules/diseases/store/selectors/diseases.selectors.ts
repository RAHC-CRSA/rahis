import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DiseaseState } from '../reducers';
import { featureKey } from '../actions';

const diseaseState = createFeatureSelector<DiseaseState>(featureKey);

export const getDiseases = createSelector(
    diseaseState,
    (state: DiseaseState) => state.data
);

export const getDiseasesLoading = createSelector(
    diseaseState,
    (state: DiseaseState) => state.loading
);

export const getDiseasesLoaded = createSelector(
    diseaseState,
    (state: DiseaseState) => state.loaded
);

export const getSpecies = createSelector(
    diseaseState,
    (state: DiseaseState) => state.species
);

export const getFeedback = createSelector(
    diseaseState,
    (state: DiseaseState) => state.feedback
);
