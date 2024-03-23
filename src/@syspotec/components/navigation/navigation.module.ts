import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SyspotecScrollbarModule } from '@syspotec/directives/scrollbar/public-api';
import { SyspotecHorizontalNavigationBasicItemComponent } from '@syspotec/components/navigation/horizontal/components/basic/basic.component';
import { SyspotecHorizontalNavigationBranchItemComponent } from '@syspotec/components/navigation/horizontal/components/branch/branch.component';
import { SyspotecHorizontalNavigationDividerItemComponent } from '@syspotec/components/navigation/horizontal/components/divider/divider.component';
import { SyspotecHorizontalNavigationSpacerItemComponent } from '@syspotec/components/navigation/horizontal/components/spacer/spacer.component';
import { SyspotecHorizontalNavigationComponent } from '@syspotec/components/navigation/horizontal/horizontal.component';
import { SyspotecVerticalNavigationAsideItemComponent } from '@syspotec/components/navigation/vertical/components/aside/aside.component';
import { SyspotecVerticalNavigationBasicItemComponent } from '@syspotec/components/navigation/vertical/components/basic/basic.component';
import { SyspotecVerticalNavigationCollapsableItemComponent } from '@syspotec/components/navigation/vertical/components/collapsable/collapsable.component';
import { SyspotecVerticalNavigationDividerItemComponent } from '@syspotec/components/navigation/vertical/components/divider/divider.component';
import { SyspotecVerticalNavigationGroupItemComponent } from '@syspotec/components/navigation/vertical/components/group/group.component';
import { SyspotecVerticalNavigationSpacerItemComponent } from '@syspotec/components/navigation/vertical/components/spacer/spacer.component';
import { SyspotecVerticalNavigationComponent } from '@syspotec/components/navigation/vertical/vertical.component';

@NgModule({
    declarations: [
        SyspotecHorizontalNavigationBasicItemComponent,
        SyspotecHorizontalNavigationBranchItemComponent,
        SyspotecHorizontalNavigationDividerItemComponent,
        SyspotecHorizontalNavigationSpacerItemComponent,
        SyspotecHorizontalNavigationComponent,
        SyspotecVerticalNavigationAsideItemComponent,
        SyspotecVerticalNavigationBasicItemComponent,
        SyspotecVerticalNavigationCollapsableItemComponent,
        SyspotecVerticalNavigationDividerItemComponent,
        SyspotecVerticalNavigationGroupItemComponent,
        SyspotecVerticalNavigationSpacerItemComponent,
        SyspotecVerticalNavigationComponent
    ],
    imports     : [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatTooltipModule,
        SyspotecScrollbarModule
    ],
    exports     : [
        SyspotecHorizontalNavigationComponent,
        SyspotecVerticalNavigationComponent
    ]
})
export class SyspotecNavigationModule
{
}
