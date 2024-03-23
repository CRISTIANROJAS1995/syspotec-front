import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MATERIAL_SANITY_CHECKS } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { SyspotecConfirmationModule } from '@syspotec/services/confirmation';
import { SyspotecLoadingModule } from '@syspotec/services/loading';
import { SyspotecMediaWatcherModule } from '@syspotec/services/media-watcher/media-watcher.module';
import { SyspotecPlatformModule } from '@syspotec/services/platform/platform.module';
import { SyspotecSplashScreenModule } from '@syspotec/services/splash-screen/splash-screen.module';
import { SyspotecUtilsModule } from '@syspotec/services/utils/utils.module';

@NgModule({
    imports  : [
        SyspotecConfirmationModule,
        SyspotecLoadingModule,
        SyspotecMediaWatcherModule,
        SyspotecPlatformModule,
        SyspotecSplashScreenModule,
        SyspotecUtilsModule
    ],
    providers: [
        {
            // Disable 'theme' sanity check
            provide : MATERIAL_SANITY_CHECKS,
            useValue: {
                doctype: true,
                theme  : false,
                version: true
            }
        },
        {
            // Use the 'fill' appearance on Angular Material form fields by default
            provide : MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'fill'
            }
        }
    ]
})
export class SyspotecModule
{
    /**
     * Constructor
     */
    constructor(@Optional() @SkipSelf() parentModule?: SyspotecModule)
    {
        if ( parentModule )
        {
            throw new Error('SyspotecModule has already been loaded. Import this module in the AppModule only!');
        }
    }
}
