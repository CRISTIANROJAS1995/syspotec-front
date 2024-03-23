import { Route } from '@angular/router';
import { AddPromotionComponent } from './add-promotion.component';


export const addPromotionRoutes: Route[] = [
    {
        path     : ':id',
        component: AddPromotionComponent
        // resolve  : {
        //     activities: DetailHiBeatResolver
        // }
    }
];
