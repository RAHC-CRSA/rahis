import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InstitutionsState } from '../reducers';
import { featureKey } from '../actions';

const institutionsState = createFeatureSelector<InstitutionsState>(featureKey);

export const getInstitutions = createSelector(
    institutionsState,
    (state: InstitutionsState) => state.data
);

export const getInstitutionsLoading = createSelector(
    institutionsState,
    (state: InstitutionsState) => state.loading
);
