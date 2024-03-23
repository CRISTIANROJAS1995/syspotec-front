import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { HibeatResponseModel } from 'app/core/models/hibeat/hibeat-response-model';
import { UserResponseSummaryModel } from 'app/core/models/user/user-response-summary-model';
import { TopListService } from './top-list.service';
import { Router } from '@angular/router';



@Component({
    selector: 'top-list',
    templateUrl: './top-list.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class TopListComponent
    implements OnInit, AfterViewInit, OnDestroy {
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    topArtist: UserResponseSummaryModel[] = [];
    topHb: HibeatResponseModel[] = [];


    displayedColumns: string[] = [
        'No',
        'points',
        'user-name'
    ];

    displayedColumnsTopHb: string[] = [
        'No',
        'points',
        'user-name',
        'Artist'
    ];
    dataSource: MatTableDataSource<UserResponseSummaryModel>;
    dataSourceTopHb: MatTableDataSource<HibeatResponseModel>;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _TopListService: TopListService,


    ) { }

    ngOnInit(): void {
        this.getTopArtist();
        this.getTopHb();
    }

    ngAfterViewInit() {
    }

    getTopArtist(): void {
        this._TopListService.getTopArtist()
            .subscribe(
                (response: UserResponseSummaryModel[]) => {
                    this.topArtist = response;
                    this.dataSource = new MatTableDataSource(this.topArtist);
                },
                (response) => {
                    this.topArtist = [];
                }
            );
    }

    getTopHb(): void {
        this._TopListService.getTopHiBeats()
            .subscribe(
                (response: HibeatResponseModel[]) => {
                    this.topHb = response;
                    this.dataSourceTopHb = new MatTableDataSource(this.topHb);
                },
                (response) => {
                    this.topHb = [];
                }
            );
    }



    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    goDetail(topArtist: UserResponseSummaryModel) {
        this._router.navigate(['/pages/detail', topArtist.identifier]);
    }

}
