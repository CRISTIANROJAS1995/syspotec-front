import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { SyspotecLoadingService } from '@syspotec/services/loading/loading.service';

@Injectable()
export class SyspotecLoadingInterceptor implements HttpInterceptor
{
    handleRequestsAutomatically: boolean;

    /**
     * Constructor
     */
    constructor(
        private _syspotecLoadingService: SyspotecLoadingService
    )
    {
        // Subscribe to the auto
        this._syspotecLoadingService.auto$
            .subscribe((value) => {
                this.handleRequestsAutomatically = value;
            });
    }

    /**
     * Intercept
     *
     * @param req
     * @param next
     */
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        // If the Auto mode is turned off, do nothing
        if ( !this.handleRequestsAutomatically )
        {
            return next.handle(req);
        }

        // Set the loading status to true
        this._syspotecLoadingService._setLoadingStatus(true, req.url);

        return next.handle(req).pipe(
            finalize(() => {
                // Set the status to false if there are any errors or the request is completed
                this._syspotecLoadingService._setLoadingStatus(false, req.url);
            }));
    }
}
