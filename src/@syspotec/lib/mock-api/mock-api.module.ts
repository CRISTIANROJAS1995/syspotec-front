import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DARKAN_MOCK_API_DEFAULT_DELAY } from '@syspotec/lib/mock-api/mock-api.constants';
import { SyspotecMockApiInterceptor } from '@syspotec/lib/mock-api/mock-api.interceptor';

@NgModule({
    providers: [
        {
            provide : HTTP_INTERCEPTORS,
            useClass: SyspotecMockApiInterceptor,
            multi   : true
        }
    ]
})
export class SyspotecMockApiModule
{
    /**
     * SyspotecMockApi module default configuration.
     *
     * @param mockApiServices - Array of services that register mock API handlers
     * @param config - Configuration options
     * @param config.delay - Default delay value in milliseconds to apply all responses
     */
    static forRoot(mockApiServices: any[], config?: { delay?: number }): ModuleWithProviders<SyspotecMockApiModule>
    {
        return {
            ngModule : SyspotecMockApiModule,
            providers: [
                {
                    provide   : APP_INITIALIZER,
                    deps      : [...mockApiServices],
                    useFactory: () => (): any => null,
                    multi     : true
                },
                {
                    provide : DARKAN_MOCK_API_DEFAULT_DELAY,
                    useValue: config?.delay ?? 0
                }
            ]
        };
    }
}
