import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MyPromotionService } from './promos.service';
import { addPromotion } from 'app/core/models/promotion/add-promotion-model';

@Component({
    selector: 'promos',
    templateUrl: './promos.component.html',
})
export class PromosComponent implements OnInit {

    addNewsForm: UntypedFormGroup;
    myPromotion: addPromotion[] = [];

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private _promotionService: MyPromotionService
    ) { }

    ngOnInit(): void {
        this.getMyPromotion();
    }

    addPromo() {
        this._router.navigate(['/pages/add-promotion/new']);
    }

    getMyPromotion(): void {
        this._promotionService.getMyPromotions()
            .subscribe(
                (response: addPromotion[]) => {
                    this.myPromotion = response;
                },
                (response) => {
                    this.myPromotion = [];
                }
            );
    }

    goEditPromotion(promo: addPromotion) {
        this._router.navigate(['/pages/add-promotion',promo.id]);
    }
}
