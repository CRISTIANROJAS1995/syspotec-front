import { Route } from '@angular/router';

import { ApprovalHbComponent } from './approval-hb.component';

export const ApprovalHbRoutes: Route[] = [
    {
        path     : '',
        component: ApprovalHbComponent
        // resolve  : {
        //     data: DashboardHibeatsResolver
        // }
    }
];
