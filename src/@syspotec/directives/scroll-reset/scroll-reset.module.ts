import { NgModule } from '@angular/core';
import { SyspotecScrollResetDirective } from '@syspotec/directives/scroll-reset/scroll-reset.directive';

@NgModule({
    declarations: [
        SyspotecScrollResetDirective
    ],
    exports     : [
        SyspotecScrollResetDirective
    ]
})
export class SyspotecScrollResetModule
{
}
