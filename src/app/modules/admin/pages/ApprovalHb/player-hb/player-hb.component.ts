import { Component, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'app/core/user/user.service';
import { DashboardHibeatsService } from 'app/modules/admin/dashboards/hibeats/hibeats.service';
import { FileUploadComponent } from 'app/shared/components/file-upload/file-upload.component';

import { UserModelCls } from 'app/core/models/user-model';
import Swal from 'sweetalert2';
import { HiBeatDto } from 'app/core/models/hi-beat.dto';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HibeatResponseModel } from 'app/core/models/hibeat/hibeat-response-model';

const MAX_DURATION_SECS = 304;

@Component({
    selector: 'player-hb',
    templateUrl: './player-hb.component.html',
})
export class PlayerHbComponent implements OnInit {
    @ViewChild(FileUploadComponent) hiBeatSelector: FileUploadComponent;

    @HostListener('window:beforeunload', ['$event'])
    beforeUnloadHander(event: Event) {
        return !this.isLoading;
    }

    addNewsForm: UntypedFormGroup;

    //Variables
    showModal = false;
    titleModal = '';
    isLoading = false;
    textModal = '';
    textModalExtra: string;
    typeModal: string = 'normal';
    isFormValid: boolean = false;

    coverFile: File;
    hiBeatFile: File;

    hibeatAudioUrl: string = '';
    hibeatCoverUrl: string = '';

    userModel: UserModelCls = new UserModelCls();
    hibeat: HiBeatDto = new HiBeatDto();
    isEdit: boolean = false;

    constructor(
       @Inject(MAT_DIALOG_DATA) public data: HibeatResponseModel,
        private _activatedRoute: ActivatedRoute,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private _userService: UserService
    ) {}

    ngOnInit(): void {
        // Create the form
        this.addNewsForm = this._formBuilder.group({
            title: [''],
            stamp: [''],
        });
    }

    listHb() {
        this._router.navigate(['/pages/listHb']);
    }
}
