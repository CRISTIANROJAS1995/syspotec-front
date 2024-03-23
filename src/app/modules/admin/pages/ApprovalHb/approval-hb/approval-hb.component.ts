import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from 'app/core/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserResponseDtoModel } from 'app/core/models/user/user-response-dto-model';
import { HibeatService } from 'app/core/hibeat/hibeat.service';
import { HibeatResponseModel } from 'app/core/models/hibeat/hibeat-response-model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { PlayerHbComponent } from '../player-hb/player-hb.component';
import { CopyrightHbComponent } from '../copyright-hb/copyright-hb.component';



@Component({
    selector: 'approval-hb',
    templateUrl: './approval-hb.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class ApprovalHbComponent
    implements OnInit, AfterViewInit, OnDestroy
{
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    hibeats: HibeatResponseModel[] = [];
    userModel: UserResponseDtoModel = new UserResponseDtoModel();

    displayedColumns: string[] = [
        'title',
        'artist-name',
        'email',
        'actions',
    ];
    dataSource: MatTableDataSource<HibeatResponseModel>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _matDialog: MatDialog,
        private _userService: UserService,
        private _hibeatService: HibeatService
    ) {}

    ngOnInit(): void {
        this._userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: UserResponseDtoModel) => {
                this.userModel = user;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        this._hibeatService.hibeats$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((hibeats: HibeatResponseModel[]) => {

                this.hibeats = hibeats;

                // Assign the data to the data source for the table to render
                this.dataSource = new MatTableDataSource(this.hibeats);

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    goDetail(hibeat: HibeatResponseModel) {
        this._router.navigate(['/pages/detail', hibeat.identifier]);
    }

    audioHiBeat(hibeat: HibeatResponseModel): void {
        this._matDialog.open(PlayerHbComponent, {
            autoFocus: false,
            data: hibeat
        });
    }

    copyrightHiBeat(hibeat: HibeatResponseModel): void {
        this._matDialog.open(CopyrightHbComponent, {
            autoFocus: false,
            data: hibeat
        });
    }
}
