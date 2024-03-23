import { NgModule } from '@angular/core';
import { SyspotecMediaWatcherService } from '@syspotec/services/media-watcher/media-watcher.service';

@NgModule({
    providers: [
        SyspotecMediaWatcherService
    ]
})
export class SyspotecMediaWatcherModule
{
    /**
     * Constructor
     */
    constructor(private _syspotecMediaWatcherService: SyspotecMediaWatcherService)
    {
    }
}
