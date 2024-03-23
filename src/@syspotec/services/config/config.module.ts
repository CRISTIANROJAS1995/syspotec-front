import { ModuleWithProviders, NgModule } from '@angular/core';
import { SyspotecConfigService } from '@syspotec/services/config/config.service';
import { DARKAN_APP_CONFIG } from '@syspotec/services/config/config.constants';

@NgModule()
export class SyspotecConfigModule
{
    /**
     * Constructor
     */
    constructor(private _syspotecConfigService: SyspotecConfigService)
    {
    }

    /**
     * forRoot method for setting user configuration
     *
     * @param config
     */
    static forRoot(config: any): ModuleWithProviders<SyspotecConfigModule>
    {
        return {
            ngModule : SyspotecConfigModule,
            providers: [
                {
                    provide : DARKAN_APP_CONFIG,
                    useValue: config
                }
            ]
        };
    }
}
