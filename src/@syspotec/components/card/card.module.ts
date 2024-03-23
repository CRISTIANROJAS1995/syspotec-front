import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyspotecCardComponent } from '@syspotec/components/card/card.component';

@NgModule({
    declarations: [
        SyspotecCardComponent
    ],
    imports     : [
        CommonModule
    ],
    exports     : [
        SyspotecCardComponent
    ]
})
export class SyspotecCardModule
{
}
