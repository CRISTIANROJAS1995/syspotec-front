import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SyspotecAlertComponent } from '@syspotec/components/alert/alert.component';

@NgModule({
    declarations: [
        SyspotecAlertComponent
    ],
    imports     : [
        CommonModule,
        MatButtonModule,
        MatIconModule
    ],
    exports     : [
        SyspotecAlertComponent
    ]
})
export class SyspotecAlertModule
{
}
