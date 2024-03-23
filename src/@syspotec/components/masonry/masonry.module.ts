import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyspotecMasonryComponent } from '@syspotec/components/masonry/masonry.component';

@NgModule({
    declarations: [
        SyspotecMasonryComponent
    ],
    imports     : [
        CommonModule
    ],
    exports     : [
        SyspotecMasonryComponent
    ]
})
export class SyspotecMasonryModule
{
}
