import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SyspotecLoadingInterceptor } from '@syspotec/services/loading/loading.interceptor';

@NgModule({
    providers: [
        {
            provide : HTTP_INTERCEPTORS,
            useClass: SyspotecLoadingInterceptor,
            multi   : true
        }
    ]
})
export class SyspotecLoadingModule
{
}
