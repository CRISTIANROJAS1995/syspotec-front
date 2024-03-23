import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyspotecDrawerComponent } from '@syspotec/components/drawer/drawer.component';

@NgModule({
    declarations: [
        SyspotecDrawerComponent
    ],
    imports     : [
        CommonModule
    ],
    exports     : [
        SyspotecDrawerComponent
    ]
})
export class SyspotecDrawerModule
{
}
