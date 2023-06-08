import * as RegionActionTypes from '../actions/regions.actions';
import { createReducer, on } from '@ngrx/store';
import { CountryDto, RegionDto } from '../../../../web-api-client';

export interface RegionsState {
    data?: RegionDto[] | null;
    countries?: CountryDto[] | null;
    loaded: boolean;
    loading: boolean;
    error: string | null;
}

export const initialState: RegionsState = {
    data: null,
    countries: [],
    loaded: false,
    loading: false,
    error: null,
};

export const reducer = createReducer(
    initialState,
    on(RegionActionTypes.addRegion, (state) => ({
        ...state,
        loading: true,
    })),
    on(RegionActionTypes.addRegionSuccess, (state) => ({
        ...state,
        loading: false,
    })),
    on(RegionActionTypes.loadRegions, (state) => ({ ...state, loading: true })),
    on(RegionActionTypes.loadRegionsSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        data: payload,
    })),
    on(RegionActionTypes.loadCountries, (state) => ({
        ...state,
        loading: true,
    })),
    on(RegionActionTypes.loadCountriesSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: true,
        countries: payload,
    })),
    on(RegionActionTypes.setFeedback, (state, { payload }) => ({
        ...state,
        loading: false,
        loaded: !payload.isError,
        feedback: payload,
    })),
    on(RegionActionTypes.clearFeedback, (state) => ({
        ...state,
        feedback: null,
    }))
);
