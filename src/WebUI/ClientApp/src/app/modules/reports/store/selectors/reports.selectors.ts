import { createFeatureSelector, createSelector } from '@ngrx/store';
import { featureKey } from '../actions';
import { ReportState } from '../reducers';

const reportState = createFeatureSelector<ReportState>(featureKey);

export const getReports = createSelector(
    reportState,
    (state: ReportState) => state.data
);

export const getUnverifiedReports = createSelector(
    reportState,
    (state: ReportState) => state.data.filter((e) => !e.isVerified)
);

export const getAnalytics = createSelector(
    reportState,
    (state: ReportState) => state.analytics
);

export const getCommunities = createSelector(
    reportState,
    (state: ReportState) => state.communities
);

export const getDistricts = createSelector(
    reportState,
    (state: ReportState) => state.districts
);

export const getMunicipalities = createSelector(
    reportState,
    (state: ReportState) => state.municipalities
);

export const getRegions = createSelector(
    reportState,
    (state: ReportState) => state.regions
);

export const getCountries = createSelector(
    reportState,
    (state: ReportState) => state.countries
);

export const getOccurrences = createSelector(
    reportState,
    (state: ReportState) => state.occurrences
);

export const getReport = createSelector(
    reportState,
    (state: ReportState) => state.entry
);

export const getInstitutions = createSelector(
    reportState,
    (state: ReportState) => state.institutions
);

export const getParaProfessionals = createSelector(
    reportState,
    (state: ReportState) => state.professionals
);

export const getDiseases = createSelector(
    reportState,
    (state: ReportState) => state.diseases
);

export const getSpecies = createSelector(
    reportState,
    (state: ReportState) => state.species
);

export const getReportsLoading = createSelector(
    reportState,
    (state: ReportState) => state.loading
);

export const getReportsLoaded = createSelector(
    reportState,
    (state: ReportState) => state.loaded
);

export const getFeedback = createSelector(
    reportState,
    (state: ReportState) => state.feedback
);
