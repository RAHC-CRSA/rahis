import * as ReportActionTypes from '../actions/reports.actions';
import {
    createReducer,
    on,
    createFeatureSelector,
    createSelector,
} from '@ngrx/store';
import {
    CountryDto,
    DiseaseDto,
    InstitutionDto,
    OccurrenceDto,
    ParaProfessionalDto,
    RegionDto,
    ReportDto,
    ReportListDto,
    ServerResponse,
    SpeciesDto,
} from '../../../../web-api-client';
import { featureKey } from '../actions';
import { ReportsState } from '..';

export interface ReportState {
    data: ReportDto | null;
    reports: ReportListDto[] | null;
    regions?: RegionDto[] | null;
    countries?: CountryDto[] | null;
    occurrences?: OccurrenceDto[] | null;
    professionals?: ParaProfessionalDto[] | null;
    institutions?: InstitutionDto[] | null;
    diseases?: DiseaseDto[] | null;
    species?: SpeciesDto[] | null;
    loaded: boolean;
    loading: boolean;
    feedback?: ServerResponse | null;
}

export const initialState: ReportState = {
    data: null,
    reports: [],
    regions: [],
    countries: [],
    occurrences: [],
    professionals: [],
    institutions: [],
    diseases: [],
    species: [],
    loaded: false,
    loading: false,
    feedback: null,
};

export const reportsReducer = createReducer(
    initialState,
    on(ReportActionTypes.createReport, (state) => ({
        ...state,
        loading: true,
    })),
    on(ReportActionTypes.createReportSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        error: null,
        data: payload,
    })),
    on(ReportActionTypes.loadReport, (state) => ({ ...state, loading: true })),
    on(ReportActionTypes.loadReportSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        data: payload,
    })),
    on(ReportActionTypes.loadReports, (state) => ({ ...state, loading: true })),
    on(ReportActionTypes.loadReportsSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        reports: payload,
    })),
    on(ReportActionTypes.loadRegions, (state) => ({ ...state, loading: true })),
    on(ReportActionTypes.loadRegionsSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        regions: payload,
    })),
    on(ReportActionTypes.addRegion, (state) => ({ ...state, loading: true })),
    on(ReportActionTypes.addRegionSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        regions: [...state.regions, payload],
    })),
    on(ReportActionTypes.loadCountries, (state) => ({
        ...state,
        loading: true,
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
    on(ReportActionTypes.loadOccurrencesSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: true,
        occurrences: payload,
    })),
    on(ReportActionTypes.loadParaProfessionals, (state) => ({
        ...state,
        loading: true,
    })),
    on(
        ReportActionTypes.loadParaProfessionalsSuccess,
        (state, { payload }) => ({
            ...state,
            loading: false,
            loaded: true,
            professionals: payload,
        })
    ),
    on(ReportActionTypes.addParaProfessional, (state) => ({
        ...state,
        loading: true,
    })),
    on(ReportActionTypes.addParaProfessionalSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        professionals: [...state.professionals, payload],
    })),
    on(ReportActionTypes.loadInstitutions, (state) => ({
        ...state,
        loading: true,
    })),
    on(ReportActionTypes.loadInstitutionsSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        institutions: payload,
    })),
    on(ReportActionTypes.addInstitution, (state) => ({
        ...state,
        loading: true,
    })),
    on(ReportActionTypes.addInstitutionSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        institutions: [...state.institutions, payload],
    })),
    on(ReportActionTypes.loadDiseases, (state) => ({
        ...state,
        loading: true,
    })),
    on(ReportActionTypes.loadDiseasesSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        diseases: payload,
    })),
    on(ReportActionTypes.addDisease, (state) => ({ ...state, loading: true })),
    on(ReportActionTypes.addDiseaseSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        diseases: [...state.diseases, payload],
    })),
    on(ReportActionTypes.loadSpecies, (state) => ({ ...state, loading: true })),
    on(ReportActionTypes.loadSpeciesSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        species: payload,
    })),
    on(ReportActionTypes.addSpecies, (state) => ({ ...state, loading: true })),
    on(ReportActionTypes.addSpeciesSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        species: [...state.species, payload],
    })),
    on(ReportActionTypes.setFeedback, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: !payload.isError,
        feedback: payload,
    })),
    on(ReportActionTypes.clearFeedback, (state) => ({
        ...state,
        feedback: null,
    }))
);
