import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyspotecHighlightComponent } from '@syspotec/components/highlight/highlight.component';

@NgModule({
    declarations: [
        SyspotecHighlightComponent
    ],
    imports     : [
        CommonModule
    ],
    exports     : [
        SyspotecHighlightComponent
    ]
})
export class SyspotecHighlightModule
{
}
