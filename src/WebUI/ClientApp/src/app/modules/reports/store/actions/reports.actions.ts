import { createAction, props } from '@ngrx/store';
import {
    CountryDto,
    ICreateReportCommand,
    OccurrenceDto,
    RegionDto,
    ReportDto,
    ReportListDto,
    ParaProfessionalDto,
    IAddInstitutionCommand,
    InstitutionDto,
    IAddRegionCommand,
    IAddParaProfessionalCommand,
    ServerResponse,
    DiseaseDto,
    IAddDiseaseCommand,
    SpeciesDto,
    IAddSpeciesCommand,
    IDeleteReportCommand,
    IDeleteOccurrenceCommand,
    MunicipalityDto,
    DistrictDto,
    CommunityDto,
    IVerifyReportCommand,
    ISendNotificationCommand,
    DataQueryTimeSpan,
    PublicReportDto,
    IGetOccurrencesQuery,
    IUpdateReportCommand,
} from '../../../../web-api-client';
import { GetParaProfessionalsQuery } from 'app/models';

// Create report
export const CREATE_REPORT = `[Reports] Create Report`;
export const CREATE_REPORT_SUCCESS = `[Reports] Create Report Success`;

export const createReport = createAction(
    CREATE_REPORT,
    props<{ payload: ICreateReportCommand }>()
);

export const createReportSuccess = createAction(
    CREATE_REPORT_SUCCESS,
    props<{ payload: ReportDto }>()
);

// Delete report
export const DELETE_REPORT = `[Reports] Delete Report`;
export const DELETE_REPORT_SUCCESS = `[Reports] Delete Report Success`;

export const deleteReport = createAction(
    DELETE_REPORT,
    props<{ payload: IDeleteReportCommand }>()
);

export const deleteReportSuccess = createAction(
    DELETE_REPORT_SUCCESS,
    props<{ payload: number }>()
);

// Load report
export const LOAD_REPORT = `[Reports] Load Report`;
export const LOAD_REPORT_SUCCESS = `[Reports] Load Report Success`;

export const loadReport = createAction(
    LOAD_REPORT,
    props<{ payload: number }>()
);
export const loadReportSuccess = createAction(
    LOAD_REPORT_SUCCESS,
    props<{ payload: ReportDto }>()
);

// Update report
export const UPDATE_REPORT = `[Reports] Update Report`;
export const UPDATE_REPORT_SUCCESS = `[Reports] Update Report Success`;

export const updateReport = createAction(
    UPDATE_REPORT,
    props<{ payload: IUpdateReportCommand }>()
);
export const updateReportSuccess = createAction(
    UPDATE_REPORT_SUCCESS,
    props<{ payload: ReportDto }>()
);

// Verify report
export const VERIFY_REPORT = `[Reports] Verify Report`;
export const VERIFY_REPORT_SUCCESS = `[Reports] Verify Report Success`;

export const verifyReport = createAction(
    VERIFY_REPORT,
    props<{ payload: IVerifyReportCommand }>()
);

export const verifyReportSuccess = createAction(
    VERIFY_REPORT_SUCCESS,
    props<{ payload: number }>()
);

// Load reports
export const LOAD_REPORTS = `[Reports] Load Reports`;
export const LOAD_REPORTS_SUCCESS = `[Reports] Load Reports Success`;

export const loadReports = createAction(
    LOAD_REPORTS,
    props<{
        payload: { isVerified: boolean; countryId: number | undefined };
    }>()
);
export const loadReportsSuccess = createAction(
    LOAD_REPORTS_SUCCESS,
    props<{ payload: ReportListDto[] }>()
);

// Load regions
export const LOAD_REGIONS = `[Reports] Load Regions`;
export const LOAD_REGIONS_SUCCESS = `[Reports] Load Regions Success`;

export const loadRegions = createAction(
    LOAD_REGIONS,
    props<{ payload?: number | undefined }>()
);
export const loadRegionsSuccess = createAction(
    LOAD_REGIONS_SUCCESS,
    props<{ payload: RegionDto[] }>()
);

// Add regions
export const ADD_REGION = `[Reports] Add Region`;
export const ADD_REGION_SUCCESS = `[Reports] Add Region Success`;

export const addRegion = createAction(
    ADD_REGION,
    props<{ payload: IAddRegionCommand }>()
);
export const addRegionSuccess = createAction(
    ADD_REGION_SUCCESS,
    props<{ payload: RegionDto }>()
);

// Load institution
export const LOAD_INSTITUTIONS = `[Reports] Load Institutions`;
export const LOAD_INSTITUTIONS_SUCCESS = `[Reports] Load Institutions Success`;

export const loadInstitutions = createAction(LOAD_INSTITUTIONS);
export const loadInstitutionsSuccess = createAction(
    LOAD_INSTITUTIONS_SUCCESS,
    props<{ payload: InstitutionDto[] }>()
);

// Add institution
export const ADD_INSTITUTION = `[Reports] Add Institution`;
export const ADD_INSTITUTION_SUCCESS = `[Reports] Add Institution Success`;

export const addInstitution = createAction(
    ADD_INSTITUTION,
    props<{ payload: IAddInstitutionCommand }>()
);
export const addInstitutionSuccess = createAction(
    ADD_INSTITUTION_SUCCESS,
    props<{ payload: InstitutionDto }>()
);

// Get countries
export const LOAD_COUNTRIES = `[Reports] Load Countries`;
export const LOAD_COUNTRIES_SUCCESS = `[Reports] Load Countries Success`;

export const loadCountries = createAction(LOAD_COUNTRIES);
export const loadCountriesSuccess = createAction(
    LOAD_COUNTRIES_SUCCESS,
    props<{ payload: CountryDto[] }>()
);

// Get occurrencies
export const LOAD_OCCURRENCES = `[Reports] Load Occurrences`;
export const LOAD_OCCURRENCES_SUCCESS = `[Reports] Load Occurrences Success`;

export const loadOccurrences = createAction(
    LOAD_OCCURRENCES,
    props<{ payload?: IGetOccurrencesQuery }>()
);
export const loadOccurrencesSuccess = createAction(
    LOAD_OCCURRENCES_SUCCESS,
    props<{ payload: OccurrenceDto[] }>()
);

// Delete report
export const DELETE_OCCURRENCE = `[Reports] Delete Occurrence`;
export const DELETE_OCCURRENCE_SUCCESS = `[Reports] Delete Occurrence Success`;

export const deleteOccurrence = createAction(
    DELETE_OCCURRENCE,
    props<{ payload: IDeleteOccurrenceCommand }>()
);

export const deleteOccurrenceSuccess = createAction(
    DELETE_OCCURRENCE_SUCCESS,
    props<{ payload: number }>()
);

// Get countries
export const LOAD_PARA_PROFESSIONALS = `[Reports] Load Para-Professionals`;
export const LOAD_PARA_PROFESSIONALS_SUCCESS = `[Reports] Load Para-Professionals Success`;

export const loadParaProfessionals = createAction(
    LOAD_PARA_PROFESSIONALS,
    props<{
        payload: GetParaProfessionalsQuery;
    }>()
);
export const loadParaProfessionalsSuccess = createAction(
    LOAD_PARA_PROFESSIONALS_SUCCESS,
    props<{ payload: ParaProfessionalDto[] }>()
);

// Add para-professional
export const ADD_PARA_PROFESSIONAL = `[Reports] Add Para-Professional`;
export const ADD_PARA_PROFESSIONAL_SUCCESS = `[Reports] Add Para-Professionals Success`;

export const addParaProfessional = createAction(
    ADD_PARA_PROFESSIONAL,
    props<{ payload: IAddParaProfessionalCommand }>()
);
export const addParaProfessionalSuccess = createAction(
    ADD_PARA_PROFESSIONAL_SUCCESS,
    props<{ payload: ParaProfessionalDto }>()
);

// Load diseases
export const LOAD_DISEASES = `[Reports] Load Diseases`;
export const LOAD_DISEASES_SUCCESS = `[Reports] Load Diseases Success`;

export const loadDiseases = createAction(LOAD_DISEASES);
export const loadDiseasesSuccess = createAction(
    LOAD_DISEASES_SUCCESS,
    props<{ payload: DiseaseDto[] }>()
);

// Add disease
export const ADD_DISEASE = `[Reports] Add Disease`;
export const ADD_DISEASE_SUCCESS = `[Reports] Add Disease Success`;

export const addDisease = createAction(
    ADD_DISEASE,
    props<{ payload: IAddDiseaseCommand }>()
);
export const addDiseaseSuccess = createAction(
    ADD_DISEASE_SUCCESS,
    props<{ payload: DiseaseDto }>()
);

// Load transboundary diseases
export const LOAD_TRANSBOUNDARY_DISEASES = `[Reports] Load TransBoundary Diseases`;
export const LOAD_TRANSBOUNDARY_DISEASES_SUCCESS = `[Reports] Load TransBoundary Diseases Success`;

export const loadTransBoundaryDiseases = createAction(
    LOAD_TRANSBOUNDARY_DISEASES,
    props<{ payload: number | undefined }>()
);

// Clear diseases
export const CLEAR_DISEASES = `[Reports] Clear Diseases`;

export const clearDiseases = createAction(CLEAR_DISEASES);

// Load species
export const LOAD_SPECIES = `[Reports] Load Species`;
export const LOAD_SPECIES_SUCCESS = `[Reports] Load Species Success`;

export const loadSpecies = createAction(LOAD_DISEASES);
export const loadSpeciesSuccess = createAction(
    LOAD_SPECIES_SUCCESS,
    props<{ payload: SpeciesDto[] }>()
);

// Add disease
export const ADD_SPECIES = `[Reports] Add Species`;
export const ADD_SPECIES_SUCCESS = `[Reports] Add Species Success`;

export const addSpecies = createAction(
    ADD_SPECIES,
    props<{ payload: IAddSpeciesCommand }>()
);
export const addSpeciesSuccess = createAction(
    ADD_SPECIES_SUCCESS,
    props<{ payload: SpeciesDto }>()
);

// Get municipalities
export const LOAD_MUNICIPALITIES = `[Reports] Load Municipalities`;
export const LOAD_MUNICIPALITIES_SUCCESS = `[Reports] Load Municipalities Success`;

export const loadMunicipalities = createAction(
    LOAD_MUNICIPALITIES,
    props<{ payload?: number | undefined }>()
);
export const loadMunicipalitiesSuccess = createAction(
    LOAD_MUNICIPALITIES_SUCCESS,
    props<{ payload?: MunicipalityDto[] }>()
);

// Get districts
export const LOAD_DISTRICTS = `[Reports] Load Districts`;
export const LOAD_DISTRICTS_SUCCESS = `[Reports] Load Districts Success`;

export const loadDistricts = createAction(
    LOAD_DISTRICTS,
    props<{ payload?: number | undefined }>()
);
export const loadDistrictsSuccess = createAction(
    LOAD_DISTRICTS_SUCCESS,
    props<{ payload?: DistrictDto[] }>()
);

// Get communities
export const LOAD_COMMUNITIES = `[Reports] Load Communities`;
export const LOAD_COMMUNITIES_SUCCESS = `[Reports] Load Communities Success`;

export const loadCommunities = createAction(
    LOAD_COMMUNITIES,
    props<{ payload?: number | undefined }>()
);
export const loadCommunitiesSuccess = createAction(
    LOAD_COMMUNITIES_SUCCESS,
    props<{ payload?: CommunityDto[] }>()
);

// Send notifications
export const SEND_NOTIFICATION = `[Reports] Send Notification`;
export const SEND_NOTIFICATION_SUCCESS = `[Reports] Send Notification Success`;

export const sendNotification = createAction(
    SEND_NOTIFICATION,
    props<{ payload: ISendNotificationCommand }>()
);

// Load Analytics
export const LOAD_ANALYTICS = `[Reports] Load Analytics`;
export const LOAD_ANALYTICS_SUCCESS = `[Reports] Load Analytics Success`;

export const loadAnalytics = createAction(
    LOAD_ANALYTICS,
    props<{ payload: DataQueryTimeSpan }>()
);
export const loadAnalyticsSuccess = createAction(
    LOAD_ANALYTICS_SUCCESS,
    props<{ payload: ReportListDto }>()
);

// Load public reports
export const LOAD_PUBLIC_REPORTS = `[Reports] Load Public Reports`;
export const LOAD_PUBLIC_REPORTS_SUCCESS = `[Reports] Load Public Reports Success`;

export const loadPublicReports = createAction(LOAD_PUBLIC_REPORTS);
export const loadPublicReportsSuccess = createAction(
    LOAD_PUBLIC_REPORTS_SUCCESS,
    props<{ payload: PublicReportDto[] }>()
);

// Set feedback
export const SET_FEEDBACK = '[Reports] Set Feedback';
export const CLEAR_FEEDBACK = '[Reports] Clear Feedback';

export const setFeedback = createAction(
    SET_FEEDBACK,
    props<{ payload: ServerResponse }>()
);

export const clearFeedback = createAction(CLEAR_FEEDBACK);
