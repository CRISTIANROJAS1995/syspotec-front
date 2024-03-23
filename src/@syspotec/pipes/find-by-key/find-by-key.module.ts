import { NgModule } from '@angular/core';
import { SyspotecFindByKeyPipe } from '@syspotec/pipes/find-by-key/find-by-key.pipe';

@NgModule({
    declarations: [
        SyspotecFindByKeyPipe
    ],
    exports     : [
        SyspotecFindByKeyPipe
    ]
})
export class SyspotecFindByKeyPipeModule
{
}
