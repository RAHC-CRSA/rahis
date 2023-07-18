import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { cloneDeep } from 'lodash-es';
import {
    Observable,
    ReplaySubject,
    catchError,
    tap,
    of,
    map,
    switchMap,
} from 'rxjs';
import { Navigation } from 'app/core/navigation/navigation.types';
import { Store } from '@ngrx/store';
import { AuthState } from '../auth/store';
import { AuthResponseDto } from 'app/web-api-client';
import { getUser } from '../auth/store/selectors';
import * as defaultNav from 'app/mock-api/common/navigation/default.data';
import * as superAdminNav from 'app/mock-api/common/navigation/super-admin.data';
import * as adminNav from 'app/mock-api/common/navigation/admin.data';
import * as chiefVeterinaryOfficerNav from 'app/mock-api/common/navigation/chief-veterinary-officer.data';
import * as reporterNav from 'app/mock-api/common/navigation/reporter.data';
import * as verifierNav from 'app/mock-api/common/navigation/verifier.data';
import { FuseNavigationItem } from '@fuse/components/navigation';

@Injectable({
    providedIn: 'root',
})
export class NavigationService implements OnInit {
    user$: Observable<AuthResponseDto | null | undefined>;
    private _compactNavigation: FuseNavigationItem[] =
        defaultNav.compactNavigation;
    private _defaultNavigation: FuseNavigationItem[] =
        defaultNav.defaultNavigation;
    private _futuristicNavigation: FuseNavigationItem[] =
        defaultNav.futuristicNavigation;
    private _horizontalNavigation: FuseNavigationItem[] =
        defaultNav.horizontalNavigation;
    private _navigation: ReplaySubject<Navigation> =
        new ReplaySubject<Navigation>(1);

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _store: Store<AuthState>
    ) {}

    ngOnInit(): void {
        this.user$ = this._store.select(getUser);
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation> {
        return this._navigation.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<Navigation> {
        return this._httpClient.get<Navigation>('api/common/navigation').pipe(
            tap((navigation) => {
                this._navigation.next(navigation);
            })
        );
    }

    updateRoleNav(role: string): void {
        let userNav = defaultNav;

        switch (role) {
            case 'Super Admin':
                userNav = superAdminNav;
                break;
            case 'Admin':
                userNav = adminNav;
                break;
            case 'Chief Veterinary Officer':
                userNav = chiefVeterinaryOfficerNav;
                break;
            case 'Reporter':
                userNav = reporterNav;
                break;
            case 'Verifier':
                userNav = verifierNav;
                break;
            default:
                break;
        }

        // Set navigation values
        this._compactNavigation = userNav.compactNavigation;
        this._defaultNavigation = userNav.defaultNavigation;
        this._futuristicNavigation = userNav.futuristicNavigation;
        this._horizontalNavigation = userNav.horizontalNavigation;

        let nav = this.getNavMenus();
        this._navigation.next(nav);

        // return this.user$.pipe(
        //     map(() => {
        //         let userNav = defaultNav;

        //         switch (role) {
        //             case 'Super Admin':
        //                 userNav = superAdminNav;
        //                 break;
        //             default:
        //                 break;
        //         }

        //         // Set navigation values
        //         this._compactNavigation = userNav.compactNavigation;
        //         this._defaultNavigation = userNav.defaultNavigation;
        //         this._futuristicNavigation = userNav.futuristicNavigation;
        //         this._horizontalNavigation = userNav.horizontalNavigation;

        //         let nav = this.getNavMenus();

        //         return nav;
        //     }),
        //     tap((navigation) => {
        //         this._navigation.next(navigation);
        //     })
        // );
    }

    buildNavigation() {
        // Fill compact navigation children using the default navigation
        this._compactNavigation.forEach((compactNavItem) => {
            this._defaultNavigation.forEach((defaultNavItem) => {
                if (defaultNavItem.id === compactNavItem.id) {
                    compactNavItem.children = cloneDeep(
                        defaultNavItem.children
                    );
                }
            });
        });

        // Fill futuristic navigation children using the default navigation
        this._futuristicNavigation.forEach((futuristicNavItem) => {
            this._defaultNavigation.forEach((defaultNavItem) => {
                if (defaultNavItem.id === futuristicNavItem.id) {
                    futuristicNavItem.children = cloneDeep(
                        defaultNavItem.children
                    );
                }
            });
        });

        // Fill horizontal navigation children using the default navigation
        this._horizontalNavigation.forEach((horizontalNavItem) => {
            this._defaultNavigation.forEach((defaultNavItem) => {
                if (defaultNavItem.id === horizontalNavItem.id) {
                    horizontalNavItem.children = cloneDeep(
                        defaultNavItem.children
                    );
                }
            });
        });
    }

    getNavMenus(): Navigation {
        return {
            compact: cloneDeep(this._compactNavigation),
            default: cloneDeep(this._defaultNavigation),
            futuristic: cloneDeep(this._futuristicNavigation),
            horizontal: cloneDeep(this._horizontalNavigation),
        };
    }
}
