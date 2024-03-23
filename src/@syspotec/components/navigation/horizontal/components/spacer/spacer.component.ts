import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SyspotecHorizontalNavigationComponent } from '@syspotec/components/navigation/horizontal/horizontal.component';
import { SyspotecNavigationService } from '@syspotec/components/navigation/navigation.service';
import { SyspotecNavigationItem } from '@syspotec/components/navigation/navigation.types';

@Component({
    selector       : 'syspotec-horizontal-navigation-spacer-item',
    templateUrl    : './spacer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SyspotecHorizontalNavigationSpacerItemComponent implements OnInit, OnDestroy
{
    @Input() item: SyspotecNavigationItem;
    @Input() name: string;

    private _syspotecHorizontalNavigationComponent: SyspotecHorizontalNavigationComponent;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _syspotecNavigationService: SyspotecNavigationService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Get the parent navigation component
        this._syspotecHorizontalNavigationComponent = this._syspotecNavigationService.getComponent(this.name);

        // Subscribe to onRefreshed on the navigation component
        this._syspotecHorizontalNavigationComponent.onRefreshed.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(() => {

            // Mark for check
            this._changeDetectorRef.markForCheck();
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
