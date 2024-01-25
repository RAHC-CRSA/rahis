import * as actions from '../actions/reports.actions';
import { createReducer, on } from '@ngrx/store';
import {
    CommunityDto,
    ControlMeasureDto,
    CountryDto,
    DiseaseDto,
    DistrictDto,
    InstitutionDto,
    MunicipalityDto,
    OccurrenceDto,
    ParaProfessionalDto,
    PublicReportDto,
    RegionDto,
    ReportDto,
    ReportListDto,
    ReportsAnalyticsDto,
    ServerResponse,
    SpeciesDto,
} from '../../../../web-api-client';

export interface ReportState {
    data?: ReportListDto[] | null;
    entry?: ReportDto | null;
    analytics?: ReportsAnalyticsDto | null;
    publicReports?: PublicReportDto[] | null;
    communities?: CommunityDto[] | null;
    districts?: DistrictDto[] | null;
    municipalities?: MunicipalityDto[] | null;
    regions?: RegionDto[] | null;
    countries?: CountryDto[] | null;
    occurrences?: OccurrenceDto[] | null;
    professionals?: ParaProfessionalDto[] | null;
    institutions?: InstitutionDto[] | null;
    diseases?: DiseaseDto[] | null;
    species?: SpeciesDto[] | null;
    controlMeasures?: ControlMeasureDto[] | null;
    loaded: boolean;
    loading: boolean;
    feedback?: ServerResponse | null;
}

export const initialState: ReportState = {
    data: [],
    entry: null,
    analytics: null,
    publicReports: null,
    communities: [],
    districts: [],
    municipalities: [],
    regions: [],
    countries: [],
    occurrences: [],
    professionals: [],
    institutions: [],
    diseases: [],
    species: [],
    controlMeasures: [],
    loaded: false,
    loading: false,
    feedback: null,
};

export const reducer = createReducer(
    initialState,
    on(actions.createReport, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.createReportSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        feedback: null,
        data: [...state.data, payload],
    })),
    on(actions.updateReport, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.updateReportSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        feedback: null,
        data: state.data.filter((e) => (e.id == payload.id ? payload : e)),
    })),
    on(actions.deleteReport, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.deleteReportSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        loading: false,
        data: state.data.filter((e) => e.id != payload),
    })),
    on(actions.loadReport, (state) => ({
        ...state,
        feedback: null,
        entry: null,
        loading: true,
    })),
    on(actions.loadReportSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        loading: false,
        entry: payload,
    })),
    on(actions.loadControlMeasures, (state) => ({
        ...state,
        feedback: null,
        controlMeasures: [],
        loading: true,
    })),
    on(actions.loadControlMeasuresSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        loading: false,
        controlMeasures: payload,
    })),
    on(actions.loadReports, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.loadReportsSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        loading: false,
        data: payload,
    })),
    on(actions.loadAnalytics, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.loadAnalyticsSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        loading: false,
        analytics: payload,
    })),
    on(actions.loadRegions, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.loadRegionsSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        loading: false,
        regions: payload,
    })),
    on(actions.addRegion, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.addRegionSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        loading: false,
        regions: [...state.regions, payload],
    })),
    on(actions.loadCountries, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.loadCountriesSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        loading: false,
        loaded: true,
        countries: payload,
    })),
    on(actions.loadOccurrences, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.loadOccurrencesSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        loading: false,
        loaded: true,
        occurrences: payload,
    })),
    on(actions.deleteOccurrence, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.deleteOccurrenceSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        loading: false,
        occurrences: state.occurrences.filter((e) => e.id != payload),
    })),
    on(actions.loadParaProfessionals, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.loadParaProfessionalsSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        loading: false,
        loaded: true,
        professionals: payload,
    })),
    on(actions.addParaProfessional, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.addParaProfessionalSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        loading: false,
        professionals: [...state.professionals, payload],
    })),
    on(actions.loadInstitutions, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.loadInstitutionsSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        loading: false,
        institutions: payload,
    })),
    on(actions.addInstitution, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.addInstitutionSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        loading: false,
        institutions: [...state.institutions, payload],
    })),
    on(actions.loadDiseases, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.loadDiseasesSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        loading: false,
        diseases: payload,
    })),
    on(actions.addDisease, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.addDiseaseSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        loading: false,
        diseases: [...state.diseases, payload],
    })),
    on(actions.loadSpecies, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.loadSpeciesSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        loading: false,
        species: payload,
    })),
    on(actions.addSpecies, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.addSpeciesSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        loading: false,
        species: [...state.species, payload],
    })),
    on(actions.loadTransBoundaryDiseases, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.verifyReport, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.deleteReport, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.deleteReportSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        loading: false,
        data: state.data.filter((e) => e.id != payload),
    })),
    on(actions.loadCommunities, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.loadCommunitiesSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        loading: false,
        communities: payload,
    })),
    on(actions.loadDistricts, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.loadDistrictsSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        loading: false,
        districts: payload,
    })),
    on(actions.loadMunicipalities, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.loadMunicipalitiesSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        loading: false,
        municipalities: payload,
    })),
    on(actions.loadPublicReports, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.loadPublicReportsSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        loading: false,
        publicReports: payload,
    })),
    on(actions.sendNotification, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.setFeedback, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: !payload.isError,
        feedback: payload,
    })),
    on(actions.clearFeedback, (state) => ({
        ...state,
        feedback: null,
    }))
);
