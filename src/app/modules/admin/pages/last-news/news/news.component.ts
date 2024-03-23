import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { addPromotion } from 'app/core/models/promotion/add-promotion-model';
import { LastNewsService } from './news.service';
import { newsModel } from 'app/core/models/last-news/news.model';

@Component({
    selector: 'news',
    templateUrl: './news.component.html',
})
export class NewsComponent implements OnInit {

    addNewsForm: UntypedFormGroup;
    lastNews: newsModel[] = [];

    constructor(
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private _newsService: LastNewsService
    ) { }

    ngOnInit(): void {
        this.getLastNews();
    }

    addNews() {
        this._router.navigate(['/pages/add-news/new']);
    }

    getLastNews(): void {
        this._newsService.getAllLastNews()
            .subscribe(
                (response: newsModel[]) => {
                    this.lastNews = response;
                },
                (response) => {
                    this.lastNews = [];
                }
            );
    }

    goEditNews(promo: newsModel) {
        this._router.navigate(['/pages/add-news',promo.id]);
    }
}
