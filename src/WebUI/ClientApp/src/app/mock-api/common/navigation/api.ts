import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import * as defaultNav from 'app/mock-api/common/navigation/default.data';
import * as superAdminNav from 'app/mock-api/common/navigation/super-admin.data';
import * as adminNav from 'app/mock-api/common/navigation/admin.data';
import * as reporterNav from 'app/mock-api/common/navigation/reporter.data';
import * as verifierNav from 'app/mock-api/common/navigation/verifier.data';

@Injectable({
    providedIn: 'root',
})
export class NavigationMockApi {
    private _compactNavigation: FuseNavigationItem[] =
        defaultNav.compactNavigation;
    private _defaultNavigation: FuseNavigationItem[] =
        defaultNav.defaultNavigation;
    private _futuristicNavigation: FuseNavigationItem[] =
        defaultNav.futuristicNavigation;
    private _horizontalNavigation: FuseNavigationItem[] =
        defaultNav.horizontalNavigation;

    /**
     * Constructor
     */
    constructor(private _fuseMockApiService: FuseMockApiService) {
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void {
        // -----------------------------------------------------------------------------------------------------
        // @ Navigation - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
            .onGet('api/common/navigation/super-admin')
            .reply(() => {
                console.log('Getting nav');
                // Set navigation values
                this._compactNavigation = superAdminNav.compactNavigation;
                this._defaultNavigation = superAdminNav.defaultNavigation;
                this._futuristicNavigation = superAdminNav.futuristicNavigation;
                this._horizontalNavigation = superAdminNav.horizontalNavigation;

                // Fill compact navigation children using the default navigation
                this.setNavigation();

                // Return the response
                return [200, this.getNavMenus()];
            });

        this._fuseMockApiService
            .onGet('api/common/navigation/admin')
            .reply(() => {
                // Set navigation values
                this._compactNavigation = adminNav.compactNavigation;
                this._defaultNavigation = adminNav.defaultNavigation;
                this._futuristicNavigation = adminNav.futuristicNavigation;
                this._horizontalNavigation = adminNav.horizontalNavigation;

                // Fill compact navigation children using the default navigation
                this.setNavigation();

                // Return the response
                return [200, this.getNavMenus()];
            });

        this._fuseMockApiService
            .onGet('api/common/navigation/reporter')
            .reply(() => {
                // Set navigation values
                this._compactNavigation = reporterNav.compactNavigation;
                this._defaultNavigation = reporterNav.defaultNavigation;
                this._futuristicNavigation = reporterNav.futuristicNavigation;
                this._horizontalNavigation = reporterNav.horizontalNavigation;

                // Fill compact navigation children using the default navigation
                this.setNavigation();

                // Return the response
                return [200, this.getNavMenus()];
            });

        this._fuseMockApiService
            .onGet('api/common/navigation/verifier')
            .reply(() => {
                // Set navigation values
                this._compactNavigation = verifierNav.compactNavigation;
                this._defaultNavigation = verifierNav.defaultNavigation;
                this._futuristicNavigation = verifierNav.futuristicNavigation;
                this._horizontalNavigation = verifierNav.horizontalNavigation;

                // Fill compact navigation children using the default navigation
                this.setNavigation();

                // Return the response
                return [200, this.getNavMenus()];
            });

        this._fuseMockApiService.onGet('api/common/navigation').reply(() => {
            // Fill compact navigation children using the default navigation
            this.setNavigation();

            // Return the response
            return [200, this.getNavMenus()];
        });
    }

    setNavigation() {
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

    getNavMenus() {
        return {
            compact: cloneDeep(this._compactNavigation),
            default: cloneDeep(this._defaultNavigation),
            futuristic: cloneDeep(this._futuristicNavigation),
            horizontal: cloneDeep(this._horizontalNavigation),
        };
    }
}
