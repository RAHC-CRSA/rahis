import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReportsState } from '..';
import { featureKey } from '../actions';
import { ReportState } from '../reducers';

const reportsState = createFeatureSelector<ReportsState>(featureKey);

const reportState = createSelector(
    reportsState,
    (state: ReportsState) => state.information
);

export const getReports = createSelector(
    reportState,
    (state: ReportState) => state.reports
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
    (state: ReportState) => state.data
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
