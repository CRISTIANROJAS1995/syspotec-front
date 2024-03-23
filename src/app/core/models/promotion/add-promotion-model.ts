/* eslint-disable eqeqeq */

export class addPromotion {
    id: number;
    titleEnglish: string;
    titleSpanish: string;
    text1English: string;
    text1Spanish: string;
    text2English: string;
    text2Spanish: string;
    subtitleEnglish: string;
    subtitleSpanish: string;
    urlOutstandingImage: string;
    urlSecondaryImage: string;
    createdDate: Date;
    updateDate: Date;


    constructor() {
      this.id = 0;
      this.titleEnglish = '';
      this.titleSpanish = '';
      this.text1English = '';
      this.text1Spanish = '';
      this.text2English = '';
      this.text2Spanish = '';
      this.subtitleEnglish = '';
      this.subtitleSpanish = '';
      this.urlOutstandingImage = '';
      this.urlSecondaryImage = '';
      this.createdDate = new Date();
      this.updateDate = new Date();

    }


  }
