import { createAction, props } from '@ngrx/store';
import {
    CommunityDto,
    CountryDto,
    DistrictDto,
    IAddRegionCommand,
    IDeleteRegionCommand,
    MunicipalityDto,
    RegionDto,
    ServerResponse,
} from '../../../../web-api-client';

export const featureKey = 'regions';

// Load regions
export const LOAD_REGIONS = `[Regions] Load Regions`;
export const LOAD_REGIONS_SUCCESS = `[Regions] Load Regions Success`;

export const loadRegions = createAction(
    LOAD_REGIONS,
    props<{ payload?: number | undefined }>()
);
export const loadRegionsSuccess = createAction(
    LOAD_REGIONS_SUCCESS,
    props<{ payload?: RegionDto[] }>()
);

// Add region
export const ADD_REGION = `[Regions] Add Region`;
export const ADD_REGION_SUCCESS = `[Regions] Add Region Success`;

export const addRegion = createAction(
    ADD_REGION,
    props<{ payload: IAddRegionCommand }>()
);
export const addRegionSuccess = createAction(
    ADD_REGION_SUCCESS,
    props<{ payload: RegionDto }>()
);

// Delete region
export const DELETE_REGION = `[Regions] Delete Region`;
export const DELETE_REGION_SUCCESS = `[Regions] Delete Region Success`;

export const deleteRegion = createAction(
    DELETE_REGION,
    props<{ payload: IDeleteRegionCommand }>()
);

export const deleteRegionSuccess = createAction(
    DELETE_REGION_SUCCESS,
    props<{ payload: number }>()
);

// Get countries
export const LOAD_COUNTRIES = `[Regions] Load Countries`;
export const LOAD_COUNTRIES_SUCCESS = `[Regions] Load Countries Success`;

export const loadCountries = createAction(LOAD_COUNTRIES);
export const loadCountriesSuccess = createAction(
    LOAD_COUNTRIES_SUCCESS,
    props<{ payload: CountryDto[] }>()
);

// Get municipalities
export const LOAD_MUNICIPALITIES = `[Regions] Load Municipalities`;
export const LOAD_MUNICIPALITIES_SUCCESS = `[Regions] Load Municipalities Success`;

export const loadMunicipalities = createAction(
    LOAD_MUNICIPALITIES,
    props<{ payload?: number | undefined }>()
);
export const loadMunicipalitiesSuccess = createAction(
    LOAD_MUNICIPALITIES_SUCCESS,
    props<{ payload?: MunicipalityDto[] }>()
);

// Get districts
export const LOAD_DISTRICTS = `[Regions] Load Districts`;
export const LOAD_DISTRICTS_SUCCESS = `[Regions] Load Districts Success`;

export const loadDistricts = createAction(
    LOAD_DISTRICTS,
    props<{ payload?: number | undefined }>()
);
export const loadDistrictsSuccess = createAction(
    LOAD_DISTRICTS_SUCCESS,
    props<{ payload?: DistrictDto[] }>()
);

// Get communities
export const LOAD_COMMUNITIES = `[Regions] Load Communities`;
export const LOAD_COMMUNITIES_SUCCESS = `[Regions] Load Communities Success`;

export const loadCommunities = createAction(
    LOAD_COMMUNITIES,
    props<{ payload?: number | undefined }>()
);
export const loadCommunitiesSuccess = createAction(
    LOAD_COMMUNITIES_SUCCESS,
    props<{ payload?: CommunityDto[] }>()
);

// Set feedback
export const SET_FEEDBACK = '[Regions] Set Feedback';
export const CLEAR_FEEDBACK = '[Regions] Clear Feedback';

export const setFeedback = createAction(
    SET_FEEDBACK,
    props<{ payload: ServerResponse }>()
);

export const clearFeedback = createAction(CLEAR_FEEDBACK);
