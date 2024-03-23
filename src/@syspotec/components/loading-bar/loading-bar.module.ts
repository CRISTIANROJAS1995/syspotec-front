import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SyspotecLoadingBarComponent } from '@syspotec/components/loading-bar/loading-bar.component';

@NgModule({
    declarations: [
        SyspotecLoadingBarComponent
    ],
    imports     : [
        CommonModule,
        MatProgressBarModule
    ],
    exports     : [
        SyspotecLoadingBarComponent
    ]
})
export class SyspotecLoadingBarModule
{
}
