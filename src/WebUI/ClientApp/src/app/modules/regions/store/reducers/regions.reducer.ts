import * as RegionActionTypes from '../actions/regions.actions';
import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { CountryDto, RegionDto } from '../../../../web-api-client';
import { featureKey } from '../actions/regions.actions';

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
  on(RegionActionTypes.loadRegionsFail, (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload,
  })),
  on(RegionActionTypes.loadRegionsSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    data: payload,
  })),
  on(RegionActionTypes.loadCountries, (state) => ({ ...state, loading: true })),
  on(RegionActionTypes.loadCountriesFail, (state, { payload }) => ({
    ...state,
    loading: false,
    error: payload,
  })),
  on(RegionActionTypes.loadCountriesSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    loaded: true,
    countries: payload,
  }))
);

const regionsState = createFeatureSelector<RegionsState>(featureKey);

export const getRegions = createSelector(
  regionsState,
  (state: RegionsState) => state.data
);

export const getCountries = createSelector(
  regionsState,
  (state: RegionsState) => state.countries
);
