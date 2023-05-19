import * as ReportActionTypes from '../actions/reports.actions';
import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import {
  CountryDto,
  OccurrenceDto,
  RegionDto,
  ReportDto,
  ReportListDto,
} from '../../../../web-api-client';
import { featureKey } from '../actions';
import { ReportsState } from '..';

export interface ReportState {
  data: ReportDto | null;
  reports: ReportListDto[] | null;
  regions?: RegionDto[] | null;
  countries?: CountryDto[] | null;
  occurrences?: OccurrenceDto[] | null;
  loaded: boolean;
  loading: boolean;
  error: string | null;
}

export const initialState: ReportState = {
  data: null,
  reports: [],
  regions: [],
  countries: [],
  occurrences: [],
  loaded: false,
  loading: false,
  error: null,
};

export const reportsReducer = createReducer(
  initialState,
  on(ReportActionTypes.createReport, (state) => ({ ...state, loading: true })),
  on(ReportActionTypes.createReportFail, (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload,
  })),
  on(ReportActionTypes.createReportSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    error: null,
    data: payload,
  })),
  on(ReportActionTypes.loadReport, (state) => ({ ...state, loading: true })),
  on(ReportActionTypes.loadReportFail, (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload,
  })),
  on(ReportActionTypes.loadReportSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    data: payload,
  })),
  on(ReportActionTypes.loadReports, (state) => ({ ...state, loading: true })),
  on(ReportActionTypes.loadReportsFail, (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload,
  })),
  on(ReportActionTypes.loadReportsSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    reports: payload,
  })),
  on(ReportActionTypes.loadRegions, (state) => ({ ...state, loading: true })),
  on(ReportActionTypes.loadRegionsFail, (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload,
  })),
  on(ReportActionTypes.loadRegionsSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    regions: payload,
  })),
  on(ReportActionTypes.loadCountries, (state) => ({ ...state, loading: true })),
  on(ReportActionTypes.loadCountriesFail, (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload,
  })),
  on(ReportActionTypes.loadCountriesSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    countries: payload,
  })),
  on(ReportActionTypes.loadOccurrences, (state) => ({
    ...state,
    loading: true,
  })),
  on(ReportActionTypes.loadOccurrencesFail, (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload,
  })),
  on(ReportActionTypes.loadOccurrencesSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    occurrences: payload,
  }))
);

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
