import { SyspotecNavigationItem } from '@syspotec/components/navigation';

export class Navigation {
    compact: SyspotecNavigationItem[];
    default: SyspotecNavigationItem[];
    futuristic: SyspotecNavigationItem[];
    horizontal: SyspotecNavigationItem[];

    constructor() {
        this.compact = [];
        this.default = [];
        this.futuristic = [];
        this.horizontal = [];
    }
}

export const defaultNavigation: SyspotecNavigationItem[] = [
    {
        id  : 'divider-1',
        type: 'divider'
    },
    {
        id      : 'dashboards',
        title   : 'CONTROL PANEL',
        type    : 'group',
        icon    : 'heroicons_outline:home',
        children: [
            {
                id   : 'dashboards.hibeats',
                title: 'HiBeats',
                type : 'basic',
                icon : 'mat_solid:playlist_play',
                link : '/dashboards/hibeats'
            },
            {
                id   : 'pages.promos',
                title: 'Promotions',
                type : 'basic',
                icon : 'mat_solid:circle_notifications',
                link : '/pages/promos'
            },
            {
                id   : 'pages.last-news',
                title: 'Last News',
                type : 'basic',
                icon : 'mat_solid:fiber_new',
                link : '/pages/last-news'
            },
            // {
            //     id   : 'dashboards.approval',
            //     title: 'Approval Hb',
            //     type : 'basic',
            //     icon : 'mat_solid:sms_failed',
            //     link : '/pages/approval-hb'
            // },
            {
                id   : 'pages.ranking',
                title: 'Global Ranking',
                type : 'basic',
                icon : 'heroicons_outline:globe-alt',
                link : '/pages/global-ranking'
            },
            {
                id   : 'pages.topArtist',
                title: 'Top List',
                type : 'basic',
                icon : 'mat_solid:account_box',
                link : '/pages/top-list'
            },


        ]
    }
];

export const horizontalNavigation: SyspotecNavigationItem[] = [
    {
        id      : 'hibeats',
        title   : 'HiBeats',
        type    : 'basic',
        icon    : 'mat_solid:playlist_play',
        link    : '/dashboards/hibeats'
        // children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id      : 'promotions',
        title   : 'Promotions',
        type    : 'basic',
        icon    : 'mat_solid:circle_notifications',
        link    : '/pages/promos'
    },
    {
        id      : 'last-news',
        title   : 'Last News',
        type    : 'basic',
        icon    : 'mat_solid:fiber_new',
        link    : '/pages/last-news'
    }

    // {
    //     id      : 'approval',
    //     title   : 'Approval Hb',
    //     type    : 'basic',
    //     icon    : 'mat_solid:sms_failed',
    //     link    : '/pages/edit/new'
    // },
];
