import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RegionsState } from '../reducers';
import { featureKey } from '../actions';

const regionsState = createFeatureSelector<RegionsState>(featureKey);

export const getRegions = createSelector(
    regionsState,
    (state: RegionsState) => state.data
);

export const getCountries = createSelector(
    regionsState,
    (state: RegionsState) => state.countries
);

export const getRegionsLoading = createSelector(
    regionsState,
    (state: RegionsState) => state.loading
);
