import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'app/shared/shared.module';
import { DashboardHibeatsComponent } from './hibeats.component';
import { dashboardHibeatsRoutes } from './hibeats.routing';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SyspotecDrawerModule } from '@syspotec/components/drawer';
import { SyspotecScrollbarModule } from '@syspotec/directives/scrollbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DurationPipe } from 'app/shared/pipes/duration.pipe';


@NgModule({
    declarations: [
        DashboardHibeatsComponent,
    ],
    imports     : [
        RouterModule.forChild(dashboardHibeatsRoutes),
        CommonModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatSortModule,
        MatTableModule,
        NgApexchartsModule,
        MatFormFieldModule,
        MatInputModule,
        SyspotecDrawerModule,
        SyspotecScrollbarModule,
        SharedModule,
        MatPaginatorModule
    ],
    exports: [],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class DashboardHibeatsModule
{
}
