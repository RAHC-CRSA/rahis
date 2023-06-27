import * as actions from '../actions/reports.actions';
import { createReducer, on } from '@ngrx/store';
import {
    CommunityDto,
    CountryDto,
    DiseaseDto,
    DistrictDto,
    InstitutionDto,
    MunicipalityDto,
    OccurrenceDto,
    ParaProfessionalDto,
    RegionDto,
    ReportDto,
    ReportListDto,
    ServerResponse,
    SpeciesDto,
} from '../../../../web-api-client';

export interface ReportState {
    data?: ReportListDto[] | null;
    entry?: ReportDto | null;
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
    loaded: boolean;
    loading: boolean;
    feedback?: ServerResponse | null;
}

export const initialState: ReportState = {
    data: [],
    entry: null,
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
    on(actions.verifyReport, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.verifyReportSuccess, (state, { payload }) => {
        let report = state.data.find((e) => e.id == payload);
        report.isVerified = true;
        return {
            ...state,
            feedback: null,
            loading: false,
            data: state.data.map((e) => (e.id != payload ? e : report)),
        };
    }),
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
