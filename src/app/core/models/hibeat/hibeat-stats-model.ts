import { HibeatResponseModel } from './hibeat-response-model';

export class HibeatResponseModelStats {
    totalMonthlyListener: number;
    totalReproduction: number;
    totalLike: number;
    totalShare: number;
    totalComment: number;
    lstContry: HibeatResponseModellstContry[];
    lstAge: HibeatResponseModellstAge[];
    lstGender: HibeatResponseModellstGender[];

    constructor() {
        this.totalMonthlyListener = 0;
        this.totalReproduction = 0;
        this.totalLike = 0;
        this.totalShare = 0;
        this.totalComment = 0;
        this.lstContry = [];
        this.lstAge = [];
        this.lstGender = [];
    }
}

export class HibeatResponseModellstContry {
    name: string;
    value: number;

    constructor() {
        this.name = '';
        this.value = 0;
    }
}

export class HibeatResponseModellstAge {
    name: string;
    value: number;

    constructor() {
        this.name = '';
        this.value = 0;
    }
}

export class HibeatResponseModellstGender {
    name: string;
    value: number;

    constructor() {
        this.name = '';
        this.value = 0;
    }
}
