import { createAction, props } from '@ngrx/store';
import {
    AddRegionCommand,
    CountryDto,
    IAddRegionCommand,
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
    props<{ payload: RegionDto[] }>()
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

// Get countries
export const LOAD_COUNTRIES = `[Regions] Load Countries`;
export const LOAD_COUNTRIES_SUCCESS = `[Regions] Load Countries Success`;

export const loadCountries = createAction(LOAD_COUNTRIES);
export const loadCountriesSuccess = createAction(
    LOAD_COUNTRIES_SUCCESS,
    props<{ payload: CountryDto[] }>()
);

// Set feedback
export const SET_FEEDBACK = '[ParaProfessionals] Set Feedback';
export const CLEAR_FEEDBACK = '[ParaProfessionals] Clear Feedback';

export const setFeedback = createAction(
    SET_FEEDBACK,
    props<{ payload: ServerResponse }>()
);

export const clearFeedback = createAction(CLEAR_FEEDBACK);
