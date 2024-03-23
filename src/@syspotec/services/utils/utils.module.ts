import { NgModule } from '@angular/core';
import { SyspotecUtilsService } from '@syspotec/services/utils/utils.service';

@NgModule({
    providers: [
        SyspotecUtilsService
    ]
})
export class SyspotecUtilsModule
{
    /**
     * Constructor
     */
    constructor(private _syspotecUtilsService: SyspotecUtilsService)
    {
    }
}
