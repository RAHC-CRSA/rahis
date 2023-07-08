import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RegionsState } from '../reducers';
import { featureKey } from '../actions';

const regionsState = createFeatureSelector<RegionsState>(featureKey);

export const getRegions = createSelector(
    regionsState,
    (state: RegionsState) => state.data
);

export const getCommunities = createSelector(
    regionsState,
    (state: RegionsState) => state.communities
);

export const getDistricts = createSelector(
    regionsState,
    (state: RegionsState) => state.districts
);

export const getMunicipalities = createSelector(
    regionsState,
    (state: RegionsState) => state.municipalities
);

export const getCountries = createSelector(
    regionsState,
    (state: RegionsState) => state.countries
);

export const getRegionsLoading = createSelector(
    regionsState,
    (state: RegionsState) => state.loading
);

export const getRegionsLoaded = createSelector(
    regionsState,
    (state: RegionsState) => state.loaded
);

export const getFeedback = createSelector(
    regionsState,
    (state: RegionsState) => state.feedback
);
