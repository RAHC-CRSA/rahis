import { createAction, props } from '@ngrx/store';
import {
  CountryDto,
  ICreateReportCommand,
  OccurrenceDto,
  RegionDto,
  ReportDto,
  ReportListDto,
} from '../../../../web-api-client';

// Create report
export const CREATE_REPORT = `[Reports] Create Report`;
export const CREATE_REPORT_FAIL = `[Reports] Create Report Fail`;
export const CREATE_REPORT_SUCCESS = `[Reports] Create Report Success`;

export const createReport = createAction(
  CREATE_REPORT,
  props<{ payload: ICreateReportCommand }>()
);

export const createReportFail = createAction(
  CREATE_REPORT_FAIL,
  props<{ payload: string }>()
);

export const createReportSuccess = createAction(
  CREATE_REPORT_SUCCESS,
  props<{ payload: ReportDto }>()
);

// Load report
export const LOAD_REPORT = `[Reports] Load Report`;
export const LOAD_REPORT_FAIL = `[Reports] Load Report Fail`;
export const LOAD_REPORT_SUCCESS = `[Reports] Load Report Success`;

export const loadReport = createAction(
  LOAD_REPORT,
  props<{ payload: number }>()
);
export const loadReportFail = createAction(
  LOAD_REPORT_FAIL,
  props<{ payload: string }>()
);
export const loadReportSuccess = createAction(
  LOAD_REPORT_SUCCESS,
  props<{ payload: ReportDto }>()
);

// Load reports
export const LOAD_REPORTS = `[Reports] Load Reports`;
export const LOAD_REPORTS_FAIL = `[Reports] Load Reports Fail`;
export const LOAD_REPORTS_SUCCESS = `[Reports] Load Reports Success`;

export const loadReports = createAction(LOAD_REPORTS);
export const loadReportsFail = createAction(
  LOAD_REPORTS_FAIL,
  props<{ payload: string }>()
);
export const loadReportsSuccess = createAction(
  LOAD_REPORTS_SUCCESS,
  props<{ payload: ReportListDto[] }>()
);

// Load regions
export const LOAD_REGIONS = `[Reports] Load Regions`;
export const LOAD_REGIONS_FAIL = `[Reports] Load Regions Fail`;
export const LOAD_REGIONS_SUCCESS = `[Reports] Load Regions Success`;

export const loadRegions = createAction(
  LOAD_REGIONS,
  props<{ payload?: number | undefined }>()
);
export const loadRegionsFail = createAction(
  LOAD_REGIONS_FAIL,
  props<{ payload: string }>()
);
export const loadRegionsSuccess = createAction(
  LOAD_REGIONS_SUCCESS,
  props<{ payload: RegionDto[] }>()
);

// Get countries
export const LOAD_COUNTRIES = `[Reports] Load Countries`;
export const LOAD_COUNTRIES_FAIL = `[Reports] Load Countries Fail`;
export const LOAD_COUNTRIES_SUCCESS = `[Reports] Load Countries Success`;

export const loadCountries = createAction(LOAD_COUNTRIES);
export const loadCountriesFail = createAction(
  LOAD_COUNTRIES_FAIL,
  props<{ payload: string }>()
);
export const loadCountriesSuccess = createAction(
  LOAD_COUNTRIES_SUCCESS,
  props<{ payload: CountryDto[] }>()
);

// Get countries
export const LOAD_OCCURRENCES = `[Reports] Load Occurrences`;
export const LOAD_OCCURRENCES_FAIL = `[Reports] Load Occurrences Fail`;
export const LOAD_OCCURRENCES_SUCCESS = `[Reports] Load Occurrences Success`;

export const loadOccurrences = createAction(LOAD_OCCURRENCES);
export const loadOccurrencesFail = createAction(
  LOAD_OCCURRENCES_FAIL,
  props<{ payload: string }>()
);
export const loadOccurrencesSuccess = createAction(
  LOAD_OCCURRENCES_SUCCESS,
  props<{ payload: OccurrenceDto[] }>()
);
