import * as actions from '../actions/regions.actions';
import { createReducer, on } from '@ngrx/store';
import {
    CommunityDto,
    CountryDto,
    DistrictDto,
    MunicipalityDto,
    RegionDto,
    ServerResponse,
} from '../../../../web-api-client';

export interface RegionsState {
    data?: RegionDto[] | null;
    entry?: RegionDto | null;
    communities?: CommunityDto[] | null;
    districts?: DistrictDto[] | null;
    municipalities?: MunicipalityDto[] | null;
    countries?: CountryDto[] | null;
    loaded: boolean;
    loading: boolean;
    feedback?: ServerResponse | null;
}

export const initialState: RegionsState = {
    data: null,
    entry: null,
    communities: [],
    districts: [],
    municipalities: [],
    countries: [],
    loaded: false,
    loading: false,
    feedback: null,
};

export const reducer = createReducer(
    initialState,
    on(actions.addRegion, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.addRegionSuccess, (state) => ({
        ...state,
        feedback: null,
        loading: false,
    })),
    on(actions.deleteRegion, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.deleteRegionSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        loading: false,
        data: state.data.filter((e) => e.id != payload),
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
        data: payload,
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
    on(actions.loadCountries, (state) => ({
        ...state,
        feedback: null,
        loading: true,
    })),
    on(actions.loadCountriesSuccess, (state, { payload }) => ({
        ...state,
        feedback: null,
        loading: false,
        countries: payload,
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
