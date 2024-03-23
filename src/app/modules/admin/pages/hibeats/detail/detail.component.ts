import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexGrid, ApexLegend, ApexNonAxisChartSeries, ApexOptions, ApexPlotOptions, ApexXAxis, ApexYAxis, ChartComponent } from 'ng-apexcharts';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { take } from 'rxjs';
import { UserResponseDtoModel } from 'app/core/models/user/user-response-dto-model';
import { UserService } from 'app/core/user/user.service';
import { HibeatResponseModel } from 'app/core/models/hibeat/hibeat-response-model';
import { HibeatService } from 'app/core/hibeat/hibeat.service';
import { HibeatResponseModellstContry } from 'app/core/models/hibeat/hibeat-stats-model';
import { DetailHibeatService } from './detail.service';
import { addPromotion } from 'app/core/models/promotion/add-promotion-model';
import { DashboardHibeatsService } from 'app/modules/admin/dashboards/hibeats/hibeats.service';
import { UpdateHibeatResponseModel } from 'app/core/models/hibeat/update-responsive-model';

export type ChartColumnOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    fill: ApexFill;
};

export type ChartDonutOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    colors: string[];
    dataLabels: any;
    labels: any;
    tooltip: any;
    legend: any;
};

@Component({
    selector: 'detail-hibeat',
    templateUrl: './detail.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DetailHibeatComponent implements OnInit {

    statAge: ChartColumnOptions;
    statCountries: HibeatResponseModellstContry[] = [];
    country: HibeatResponseModel[];
    statGenders: ChartDonutOptions;
    ageEjeX: string[] = [];
    ageEjeY: number[] = [];
    genderEjeX: string[] = [];
    genderEjeY: number[] = [];

    data: any;
    hibeat: HibeatResponseModel = new HibeatResponseModel();
    delete: UpdateHibeatResponseModel = new UpdateHibeatResponseModel();
    coverImage: string | null;
    valueCustomStatus: string = '';
    userModel: UserResponseDtoModel = new UserResponseDtoModel();

    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _userService: UserService,
        private _activatedRoute: ActivatedRoute,
        private _dashboardHibeatsService: DashboardHibeatsService,

        private _hibeatService: HibeatService) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this._activatedRoute.params.pipe(take(1)).subscribe((params) => {

            if (!params['id']) {
                this._router.navigate(['/dashboards/hibeats']);
                return;
            } else {
                this.getHibeatId(params['id']);
            }

        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    getHibeatId(identifier: any): void {
        this.loading();
        this._hibeatService.getHibeatId(identifier)
            .subscribe(
                (response: HibeatResponseModel) => {
                    this.hiddenLoading();
                    this.hibeat = response;

                    //onload charts
                    this.loadChartAge();
                    this.loadChartGenre();
                },
                (response) => {
                   this.hiddenLoading();
                   this._router.navigate(['/dashboards/hibeats']);
                }
            );
    }

    loadChartAge(): void {

        if(this.hibeat.stats.lstAge.length > 0){
            for (let i = 0; i < this.hibeat.stats.lstAge.length; i++) {
                this.ageEjeX.push(this.hibeat.stats.lstAge[i].name);
                this.ageEjeY.push(this.hibeat.stats.lstAge[i].value);
            }
        }

        this.statAge = {
            series: [
                {
                    name: 'age',
                    data: this.ageEjeY,
                },
            ],
            chart: {
                height: 500,
                parentHeightOffset: 10,
                type: 'bar',
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        position: 'top',
                    },
                },
            },
            dataLabels: {
                enabled: true,
                offsetY: -30,
                style: {
                    fontSize: '16px',
                    colors: ['#815be1'],
                },
                formatter: val => val + '%',
            },

            xaxis: {
                categories: this.ageEjeX,
                position: 'bottom',
                labels: {
                    offsetY: 5,
                    style: {
                        fontSize: '16px',
                        colors: '#815be1',
                        fontWeight: 600
                    },
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                crosshairs: {},
            },
            fill: {
                type: 'linear',
                colors: ['#815be1'],
            },
            yaxis: {
                max: (hibeatsChartsResults) => {
                    return Math.max(hibeatsChartsResults) + 5;
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                labels: {
                    show: false,
                    formatter: function (val) {
                        return val + '%';
                    },
                },
            },
        };
    }

    loadChartGenre() {
        const colors = ['#815CE1', '#4A137F', '#585DF6', '#EC4289'];

        if(this.hibeat.stats.lstGender.length > 0){
            for (let i = 0; i < this.hibeat.stats.lstGender.length; i++) {
                this.genderEjeX.push(this.hibeat.stats.lstGender[i].name);
                this.genderEjeY.push(this.hibeat.stats.lstGender[i].value);
            }
        }

        this.statGenders = {
            series: this.genderEjeY,
            chart: {
                type: 'donut',
            },
            dataLabels: {
                enabled: false,
            },
            tooltip: {
                enabled: true,
            },
            legend: {
                show: false,
            },
            colors,
            labels: this.genderEjeX,
        };
    }

    goEditHibeat(hibeat: HibeatResponseModel) {
        this._router.navigate(['/pages/edit',hibeat.identifier]);
    }

    loading() {
        Swal.fire({
            title: 'Wait',
            text: 'Loading information...',
            icon: 'info',
            confirmButtonColor: '#9333EA',
        });

        Swal.showLoading();
    }

    hiddenLoading() {
        Swal.close();
        Swal.hideLoading();
    }

    deletePromotion() {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to remove this HiBeat. This action will permanently delete the HiBeat.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9333EA',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {

                debugger;

                this.delete.stateId =2;


                this.loading();
                this._dashboardHibeatsService
                    .updateHiBeat(this.delete)
                    .pipe(take(1))
                    .subscribe((hibeat) => {
                        debugger;
                        this.hiddenLoading();
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Your HiBeat has been deleted.',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 4000,
                        }).then((result) => {
                            this._router.navigate(['/dashboards/hibeats']);
                        });
                    });
            }
        });
    }


}

