import { Component, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { syspotecAnimations } from '@syspotec/animations';
import { FileUploadComponent } from 'app/shared/components/file-upload/file-upload.component';
import * as storage from '@aws-amplify/storage';
import imageCompression from 'browser-image-compression';
import { take, filter } from 'rxjs';
import Swal from 'sweetalert2'
import { addPromotion } from 'app/core/models/promotion/add-promotion-model';
import { LastNewsService } from '../news/news.service';
import { newsModel } from 'app/core/models/last-news/news.model';

@Component({
    selector: 'add-news',
    templateUrl: './add-news.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: syspotecAnimations
})
export class AddNewsComponent implements OnInit {
    @ViewChild(FileUploadComponent) hiBeatSelector: FileUploadComponent;
    @ViewChild('hibeatNgForm') hibeatNgForm: NgForm;

    @HostListener('window:beforeunload', ['$event'])
    beforeUnloadHander(event: Event) {
        return !this.isLoading;
    }

    addPromotionForm: UntypedFormGroup;

    //Variables
    isLoading = false;
    isFormValid: boolean = false;
    showAlert: boolean = false;
    news: newsModel = new newsModel();
    lastNews: newsModel[] = [];
    delet: addPromotion = new addPromotion();
    coverFileEnglish: File;
    coverFileSpanish: File;
    coverFileSecundaryEnglish: File;
    coverFileSecundarySpanish: File;
    hiBeatFile: File;
    hiBeatFileSpanish: File;
    hiBeatFileSecundaryEnglish: File;
    hiBeatFileSecundarySpanish: File;
    hibeatCoverUrl: string = '';
    hibeatCoverUrlSpanish: string = '';
    hibeatCoverUrlSecundary: string = '';
    hibeatCoverUrlSecundarySpanish: string = '';

    isEdit: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private _newsService: LastNewsService

    ) {
    }
    /**
     * On init
     */

    ngOnInit(): void {
        // Create the form
        this.addPromotionForm = this._formBuilder.group({
            titleEnglish: [''],
            titleSpanish: [''],
            text1English: [''],
            text1Spanish: [''],
            text2English: [''],
            text2Spanish: [''],
            subtitleEnglish: [''],
            subtitleSpanish: [''],
        });

        this._activatedRoute.params.pipe(take(1)).subscribe((params) => {
            if (!params['id']) {
                this._router.navigate(['/pages/add-promotion']);
                return;
            }
            if (params['id'] != 'new') {
                this.isEdit = true;
                this.getAllLastNews(params['id']);
            } else {
                this.isEdit = false;
            }
        });

    }

    getAllLastNews(id: any): void {
        this._newsService.getAllLastNews()
            .subscribe(
                (response: newsModel[]) => {
                    this.lastNews = response;
                    var consult = this.lastNews.filter(r => r.id == id);
                    this.news = consult[0];

                    this.addPromotionForm.patchValue({
                        titleEnglish: this.news.titleEnglish,
                        titleSpanish: this.news.titleSpanish,
                        text1English: this.news.text1English,
                        text1Spanish: this.news.text1Spanish,
                        text2English: this.news.text2English,
                        text2Spanish: this.news.text2Spanish,
                        subtitleEnglish: this.news.subtitleEnglish,
                        subtitleSpanish: this.news.subtitleSpanish
                    });
                    (this.hibeatCoverUrl = this.news.urlOutstandingImage),
                    (this.hibeatCoverUrlSpanish =
                        this.news.urlOutstandingImage),
                    (this.hibeatCoverUrlSecundary =
                        this.news.urlSecondaryImage),
                    this.updateInput();
                },
                (response) => {
                    this.lastNews = [];
                }
            );
    }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    async sendData(): Promise<void> {

        // Return if the form is invalid
        if (this.addPromotionForm.invalid) {
            Swal.fire({
                title: 'Ups...',
                text: 'Faltan campos por completar..',
                icon: 'warning',
                confirmButtonColor: '#9333EA',
                confirmButtonText: 'Continue'
            });
            return;
        }
        this.isFormValid = false;
        const hibeatFormValue = this.addPromotionForm.value;

        //Fields value
        this.news.titleEnglish = hibeatFormValue.titleEnglish;
        this.news.subtitleEnglish = hibeatFormValue.subtitleEnglish;
        this.news.text1English = hibeatFormValue.text1English;
        this.news.text2English = hibeatFormValue.text2English;
        this.news.titleSpanish = hibeatFormValue.titleSpanish;
        this.news.subtitleSpanish = hibeatFormValue.subtitleSpanish;
        this.news.text1Spanish = hibeatFormValue.text1Spanish;
        this.news.text2Spanish = hibeatFormValue.text2Spanish;
        this.news.urlOutstandingImage = this.hibeatCoverUrl;
        this.news.urlSecondaryImage = this.hibeatCoverUrlSecundary;
        console.log(this.news);

        this.loading();

        if (this.hiBeatFile) {
            var resultReplace = '';
            this.news.urlOutstandingImage = await this.uploadFileS3(
                this.hiBeatFile,
                'hibeat'
            );
            var urlHibeat = await storage.Storage.get(this.news.urlOutstandingImage, {
                level: 'public',
            });

            var findIndex = urlHibeat.indexOf('?x-');
            if (findIndex != -1) {
                resultReplace = urlHibeat.substring(0, findIndex);
            } else {
                var findIndex = urlHibeat.indexOf('?X-');
                if (findIndex != -1) {
                    resultReplace = urlHibeat.substring(0, findIndex);
                } else {
                    resultReplace = urlHibeat;
                }
            }

            this.news.urlOutstandingImage = resultReplace ?? '';
        }

        if (this.hiBeatFileSecundaryEnglish) {
            var resultReplace = '';
            this.news.urlSecondaryImage = await this.uploadFileS3(
                this.hiBeatFile,
                'hibeat'
            );
            var urlHibeat = await storage.Storage.get(this.news.urlSecondaryImage, {
                level: 'public',
            });

            var findIndex = urlHibeat.indexOf('?x-');
            if (findIndex != -1) {
                resultReplace = urlHibeat.substring(0, findIndex);
            } else {
                var findIndex = urlHibeat.indexOf('?X-');
                if (findIndex != -1) {
                    resultReplace = urlHibeat.substring(0, findIndex);
                } else {
                    resultReplace = urlHibeat;
                }
            }

            this.news.urlSecondaryImage = resultReplace ?? '';
        }
        if (this.coverFileEnglish) {
            var resultReplace = '';
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
            };
            const resizeFile = await imageCompression(this.coverFileEnglish, options);
            this.news.urlOutstandingImage = await this.uploadFileS3(
                resizeFile,
                'image'
            );
            var urlImage = await storage.Storage.get(this.news.urlOutstandingImage, {
                level: 'public',
            });

            var findIndex = urlImage.indexOf('?x-');
            if (findIndex != -1) {
                resultReplace = urlImage.substring(0, findIndex);
            } else {
                var findIndex = urlImage.indexOf('?X-');
                if (findIndex != -1) {
                    resultReplace = urlImage.substring(0, findIndex);
                } else {
                    resultReplace = urlImage;
                }
            }

            this.news.urlOutstandingImage = resultReplace ?? '';
        }

        if (this.coverFileSecundaryEnglish) {
            var resultReplace = '';
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
            };
            const resizeFile = await imageCompression(this.coverFileSecundaryEnglish, options);
            this.news.urlSecondaryImage = await this.uploadFileS3(
                resizeFile,
                'image'
            );
            var urlImage = await storage.Storage.get(this.news.urlSecondaryImage, {
                level: 'public',
            });

            var findIndex = urlImage.indexOf('?x-');
            if (findIndex != -1) {
                resultReplace = urlImage.substring(0, findIndex);
            } else {
                var findIndex = urlImage.indexOf('?X-');
                if (findIndex != -1) {
                    resultReplace = urlImage.substring(0, findIndex);
                } else {
                    resultReplace = urlImage;
                }
            }

            this.news.urlSecondaryImage = resultReplace ?? '';
        }

        if (this.isEdit) {
            this._newsService.updateNews(this.news).subscribe(() => {
                this.hiddenLoading();
                this._router.navigate(['/pages/last-news']);
            });
        } else {
            this._newsService
                .createNews(this.news)
                .pipe(take(1))
                .subscribe((hibeat) => {
                    this.hiddenLoading();
                    Swal.fire({
                        title: 'Done!',
                        text: 'Your news has been successfully created, the platform is reviewing the content for approval.',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 3000
                    }).then((result) => {
                        this._router.navigate(['/pages/last-news']);
                    });

                }, (response) => {
                    // Re-enable the form
                    this.hiddenLoading();
                    this.addPromotionForm.enable();
                    Swal.fire({
                        title: 'Oops...',
                        text: 'An unexpected error occurred, please contact the administrator...',
                        icon: 'warning',
                        confirmButtonColor: '#9333EA',
                    });
                });
        }

    }
    onLoadCoverFile(file: any): void {

        this.coverFileEnglish = file as File;
        if (file == null) {
            this.hibeatCoverUrl = '';
        }

        this.updateInput();
    }

    onLoadCoverFileSecundary(file: any): void {

        this.coverFileSecundaryEnglish = file as File;
        if (file == null) {
            this.hibeatCoverUrlSecundary = '';
        }

        this.updateInput();
    }
    updateInput() {

        const hibeatFormValue = this.addPromotionForm.value;
        if (this.isEdit) {
            if (this.hibeatCoverUrl != '' || this.coverFileEnglish != null) {
                this.isFormValid = true;
                return;
            }
            this.isFormValid = false;
        } else {
            if (this.coverFileEnglish) {
                this.isFormValid = true;
                return;
            }
            this.isFormValid = false;
        }
    }
    async uploadFileS3(file: File, type: string): Promise<string> {
        var newName: string =
            type == 'image'
                ? `${this.news.id
                }#PHOTO#${new Date().toISOString()}_#${this.news.id
                }`
                : `${this.news.id}#${new Date().toISOString()}_#${this.news.id
                }`;

        await storage.Storage.put(newName, file, {
            contentType: file.type,
            level: 'public',
            metadata: { name: newName },
        });
        return newName;
    }
    loading() {
        Swal.fire({
            title: 'Wait',
            text: 'Cargando informacion...',
            icon: 'info',
            confirmButtonColor: '#9333EA',
        });

        Swal.showLoading();
    }
    hiddenLoading() {
        Swal.close();
        Swal.hideLoading();
    }

    deleteNews() {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to remove this News. This action will permanently delete the News.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9333EA',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                this.loading();
                this._newsService
                    .removeHiBeat(this.news)
                    .pipe(take(1))
                    .subscribe((hibeat) => {
                        this.hiddenLoading();
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Your News has been deleted.',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 4000,
                        }).then((result) => {
                            this._router.navigate(['/pages/last-news']);
                        });
                    });
            }
        });
    }

}
