import {
    Component,
    HostListener,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormGroup,
    NgForm,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { syspotecAnimations } from '@syspotec/animations';
import { FileUploadComponent } from 'app/shared/components/file-upload/file-upload.component';
import * as storage from '@aws-amplify/storage';
import imageCompression from 'browser-image-compression';
import { take } from 'rxjs';
import Swal from 'sweetalert2';
import { addPromotion } from 'app/core/models/promotion/add-promotion-model';
import { MyPromotionService } from '../promos/promos.service';

@Component({
    selector: 'add-promotion',
    templateUrl: './add-promotion.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: syspotecAnimations,
})
export class AddPromotionComponent implements OnInit {
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
    promotion: addPromotion = new addPromotion();
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

    myPromotion: addPromotion[] = [];
    isEdit: boolean = false;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private _promotionService: MyPromotionService
    ) {}

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
                this.getAllMyPromotion(params['id']);
            } else {
                this.isEdit = false;
            }
        });
    }

    getAllMyPromotion(id: any): void {
        this._promotionService.getMyPromotions().subscribe(
            (response: addPromotion[]) => {
                this.myPromotion = response;
                var consult = this.myPromotion.filter((r) => r.id == id);
                this.promotion = consult[0];

                this.addPromotionForm.patchValue({
                    titleEnglish: this.promotion.titleEnglish,
                    titleSpanish: this.promotion.titleSpanish,
                    text1English: this.promotion.text1English,
                    text1Spanish: this.promotion.text1Spanish,
                    text2English: this.promotion.text2English,
                    text2Spanish: this.promotion.text2Spanish,
                    subtitleEnglish: this.promotion.subtitleEnglish,
                    subtitleSpanish: this.promotion.subtitleSpanish,
                });
                (this.hibeatCoverUrl = this.promotion.urlOutstandingImage),
                    (this.hibeatCoverUrlSpanish =
                        this.promotion.urlOutstandingImage),
                    (this.hibeatCoverUrlSecundary =
                        this.promotion.urlSecondaryImage),
                    this.updateInput();
            },
            (response) => {
                this.myPromotion = [];
            }
        );
    }

    async sendData(): Promise<void> {
        debugger;

        // Return if the form is invalid
        if (this.addPromotionForm.invalid) {
            Swal.fire({
                title: 'Ups...',
                text: 'Faltan campos por completar..',
                icon: 'warning',
                confirmButtonColor: '#9333EA',
                confirmButtonText: 'Continue',
            });
            return;
        }
        this.isFormValid = false;
        const hibeatFormValue = this.addPromotionForm.value;

        //Fields value
        this.promotion.titleEnglish = hibeatFormValue.titleEnglish;
        this.promotion.subtitleEnglish = hibeatFormValue.subtitleEnglish;
        this.promotion.text1English = hibeatFormValue.text1English;
        this.promotion.text2English = hibeatFormValue.text2English;
        this.promotion.titleSpanish = hibeatFormValue.titleSpanish;
        this.promotion.subtitleSpanish = hibeatFormValue.subtitleSpanish;
        this.promotion.text1Spanish = hibeatFormValue.text1Spanish;
        this.promotion.text2Spanish = hibeatFormValue.text2Spanish;
        this.promotion.urlOutstandingImage = this.hibeatCoverUrl;
        this.promotion.urlSecondaryImage = this.hibeatCoverUrlSecundary;
        console.log(this.promotion);

        this.loading();

        if (this.hiBeatFile) {
            var resultReplace = '';
            this.promotion.urlOutstandingImage = await this.uploadFileS3(
                this.hiBeatFile,
                'hibeat'
            );
            var urlHibeat = await storage.Storage.get(
                this.promotion.urlOutstandingImage,
                {
                    level: 'public',
                }
            );

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

            this.promotion.urlOutstandingImage = resultReplace ?? '';
        }

        if (this.hiBeatFileSecundaryEnglish) {
            var resultReplace = '';
            this.promotion.urlSecondaryImage = await this.uploadFileS3(
                this.hiBeatFile,
                'hibeat'
            );
            var urlHibeat = await storage.Storage.get(
                this.promotion.urlSecondaryImage,
                {
                    level: 'public',
                }
            );

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

            this.promotion.urlSecondaryImage = resultReplace ?? '';
        }
        if (this.coverFileEnglish) {
            var resultReplace = '';
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
            };
            const resizeFile = await imageCompression(
                this.coverFileEnglish,
                options
            );
            this.promotion.urlOutstandingImage = await this.uploadFileS3(
                resizeFile,
                'image'
            );
            var urlImage = await storage.Storage.get(
                this.promotion.urlOutstandingImage,
                {
                    level: 'public',
                }
            );

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

            this.promotion.urlOutstandingImage = resultReplace ?? '';
        }

        if (this.coverFileSecundaryEnglish) {
            var resultReplace = '';
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
            };
            const resizeFile = await imageCompression(
                this.coverFileSecundaryEnglish,
                options
            );
            this.promotion.urlSecondaryImage = await this.uploadFileS3(
                resizeFile,
                'image'
            );
            var urlImage = await storage.Storage.get(
                this.promotion.urlSecondaryImage,
                {
                    level: 'public',
                }
            );

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

            this.promotion.urlSecondaryImage = resultReplace ?? '';
        }

        // if (this.isEdit) {
        //     this._promotionService
        //         .updatePromotion(this.promotion)
        //         .subscribe(() => {
        //             this.hiddenLoading();
        //             this._router.navigate(['/pages/promos']);
        //         });
        // } else {
        //     this._promotionService
        //         .createPromotion(this.promotion)
        //         .pipe(take(1))
        //         .subscribe(
        //             (hibeat) => {
        //                 this.hiddenLoading();
        //                 Swal.fire({
        //                     title: 'Done!',
        //                     text: 'Your promotion has been successfully created, the platform is reviewing the content for approval.',
        //                     icon: 'success',
        //                     showConfirmButton: false,
        //                     timer: 3000,
        //                 }).then((result) => {
        //                     this._router.navigate(['/pages/promos']);
        //                 });
        //             },
        //             (response) => {
        //                 // Re-enable the form
        //                 this.hiddenLoading();
        //                 this.addPromotionForm.enable();
        //                 Swal.fire({
        //                     title: 'Oops...',
        //                     text: 'An unexpected error occurred, please contact the administrator...',
        //                     icon: 'warning',
        //                     confirmButtonColor: '#9333EA',
        //                 });
        //             }
        //         );
        // }
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
                ? `${this.promotion.id}#PHOTO#${new Date().toISOString()}_#${
                      this.promotion.id
                  }`
                : `${this.promotion.id}#${new Date().toISOString()}_#${
                      this.promotion.id
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

    deletePromotion() {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to remove this Promotion. This action will permanently delete the Promotion.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#9333EA',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                this.loading();
                this._promotionService
                    .removeHiBeat(this.promotion)
                    .pipe(take(1))
                    .subscribe((hibeat) => {
                        this.hiddenLoading();
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Your Promotion has been deleted.',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 4000,
                        }).then((result) => {
                            this._router.navigate(['/pages/promos']);
                        });
                    });
            }
        });
    }
}
