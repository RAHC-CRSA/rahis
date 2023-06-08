/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/dashboard/home',
    },
    {
        id: 'reports',
        title: 'Reports',
        type: 'collapsable',
        icon: 'heroicons_outline:clipboard-list',
        children: [
            {
                id: 'reports.create',
                title: 'Create a Report',
                type: 'basic',
                link: '/dashboard/reports/create',
            },
        ],
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/dashboard/home',
    },
    {
        id: 'reports',
        title: 'Reports',
        type: 'collapsable',
        icon: 'heroicons_outline:clipboard-list',
        children: [
            {
                id: 'reports.create',
                title: 'Create a Report',
                type: 'basic',
                link: '/dashboard/reports/create',
            },
        ],
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/dashboard/home',
    },
    {
        id: 'reports',
        title: 'Reports',
        type: 'collapsable',
        icon: 'heroicons_outline:clipboard-list',
        children: [],
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/dashboard/home',
    },
    {
        id: 'reports',
        title: 'Reports',
        type: 'collapsable',
        icon: 'heroicons_outline:clipboard-list',
        children: [],
    },
];
