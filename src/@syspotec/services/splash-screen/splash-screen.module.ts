import { NgModule } from '@angular/core';
import { SyspotecSplashScreenService } from '@syspotec/services/splash-screen/splash-screen.service';

@NgModule({
    providers: [
        SyspotecSplashScreenService
    ]
})
export class SyspotecSplashScreenModule
{
    /**
     * Constructor
     */
    constructor(private _syspotecSplashScreenService: SyspotecSplashScreenService)
    {
    }
}
