import { NgModule } from '@angular/core';
import { SyspotecScrollbarDirective } from '@syspotec/directives/scrollbar/scrollbar.directive';

@NgModule({
    declarations: [
        SyspotecScrollbarDirective
    ],
    exports     : [
        SyspotecScrollbarDirective
    ]
})
export class SyspotecScrollbarModule
{
}
