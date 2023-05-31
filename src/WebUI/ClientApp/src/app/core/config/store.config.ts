import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Params,
} from '@angular/router';
import {
    RouterReducerState,
    routerReducer,
    RouterStateSerializer,
} from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface RouterStateUrl {
    url: string;
    queryParams: Params;
    params: Params;
}

export interface State {
    routerReducer: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
    routerReducer: routerReducer,
};

export const getRouterState =
    createFeatureSelector<RouterReducerState<RouterStateUrl>>('routerReducer');

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        let route: ActivatedRouteSnapshot = routerState.root;

        while (route.firstChild) {
            route = route.firstChild;
        }

        const {
            url,
            root: { queryParams },
        } = routerState;
        const { params } = route;

        return {
            url,
            queryParams,
            params,
        };
    }
}
