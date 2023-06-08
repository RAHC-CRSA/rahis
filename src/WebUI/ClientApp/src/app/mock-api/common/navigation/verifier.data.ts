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
                id: 'reports.list',
                title: 'View all Reports',
                type: 'basic',
                link: '/dashboard/reports/list',
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
                id: 'reports.list',
                title: 'View all Reports',
                type: 'basic',
                link: '/dashboard/reports/list',
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
