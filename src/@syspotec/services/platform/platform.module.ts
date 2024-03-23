import { NgModule } from '@angular/core';
import { SyspotecPlatformService } from '@syspotec/services/platform/platform.service';

@NgModule({
    providers: [
        SyspotecPlatformService
    ]
})
export class SyspotecPlatformModule
{
    /**
     * Constructor
     */
    constructor(private _syspotecPlatformService: SyspotecPlatformService)
    {
    }
}
