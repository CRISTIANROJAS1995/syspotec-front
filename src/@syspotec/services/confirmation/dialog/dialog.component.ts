import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SyspotecConfirmationConfig } from '@syspotec/services/confirmation/confirmation.types';

@Component({
    selector     : 'syspotec-confirmation-dialog',
    templateUrl  : './dialog.component.html',
    styles       : [
        `
            .syspotec-confirmation-dialog-panel {
                @screen md {
                    @apply w-128;
                }

                .mat-dialog-container {
                    padding: 0 !important;
                }
            }
        `
    ],
    encapsulation: ViewEncapsulation.None
})
export class SyspotecConfirmationDialogComponent
{
    /**
     * Constructor
     */
    constructor(@Inject(MAT_DIALOG_DATA) public data: SyspotecConfirmationConfig)
    {
    }

}
