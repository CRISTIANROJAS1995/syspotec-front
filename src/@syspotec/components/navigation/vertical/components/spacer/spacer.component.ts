import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SyspotecVerticalNavigationComponent } from '@syspotec/components/navigation/vertical/vertical.component';
import { SyspotecNavigationService } from '@syspotec/components/navigation/navigation.service';
import { SyspotecNavigationItem } from '@syspotec/components/navigation/navigation.types';

@Component({
    selector       : 'syspotec-vertical-navigation-spacer-item',
    templateUrl    : './spacer.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SyspotecVerticalNavigationSpacerItemComponent implements OnInit, OnDestroy
{
    @Input() item: SyspotecNavigationItem;
    @Input() name: string;

    private _syspotecVerticalNavigationComponent: SyspotecVerticalNavigationComponent;
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
        this._syspotecVerticalNavigationComponent = this._syspotecNavigationService.getComponent(this.name);

        // Subscribe to onRefreshed on the navigation component
        this._syspotecVerticalNavigationComponent.onRefreshed.pipe(
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
