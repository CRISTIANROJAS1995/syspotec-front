import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DashboardHibeatsService } from './hibeats.service';

@Injectable({
    providedIn: 'root'
})
export class DashboardHibeatsResolver
{
    /**
     * Constructor
     */
    constructor(private _dashboardHibeatsService: DashboardHibeatsService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    // resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    // {
    //     return this._dashboardHibeatsService.getData();
    // }
}
