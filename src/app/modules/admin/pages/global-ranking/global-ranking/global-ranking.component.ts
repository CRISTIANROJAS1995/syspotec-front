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
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subject, takeUntil } from 'rxjs';
import { ApexOptions } from 'ng-apexcharts';

import { UserService } from 'app/core/user/user.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import Swal from 'sweetalert2';
import { HiBeatDto } from 'app/core/models/hi-beat.dto';
import { ReactionDto } from 'app/core/models/reaction.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { UserResponseDtoModel } from 'app/core/models/user/user-response-dto-model';
import { HibeatService } from 'app/core/hibeat/hibeat.service';
import { HibeatResponseModel } from 'app/core/models/hibeat/hibeat-response-model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { GlobalRankingService } from './global-ranking.service';
import { UserResponseSummaryModel } from 'app/core/models/user/user-response-summary-model';


@Component({
    selector: 'global-ranking',
    templateUrl: './global-ranking.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class GlobalRankingComponent
    implements OnInit, AfterViewInit, OnDestroy {
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    ranking: UserResponseSummaryModel[] = [];

    displayedColumns: string[] = [
        'No',
        'points',
        'user-name',
    ];
    dataSource: MatTableDataSource<UserResponseSummaryModel>;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _globalRankingService: GlobalRankingService
    ) { }

    ngOnInit(): void {
        this.getRanking();
    }

    ngAfterViewInit() {
    }

    getRanking(): void {
        this._globalRankingService.getGlobalRanking()
            .subscribe(
                (response: UserResponseSummaryModel[]) => {
                    this.ranking = response;
                    this.dataSource = new MatTableDataSource(this.ranking);
                },
                (response) => {
                    this.ranking = [];
                }
            );
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    goDetail(hibeat: HibeatResponseModel) {
        this._router.navigate(['/pages/detail', hibeat.identifier]);
    }

}
