

export class AddHibeatResponseModel {

    title: string;
    tone: string;
    duration: string;
    bpm: string;
    recordCompany: string;
    urlFile: string;
    urlCover: string;
    lstInstrument: HibeatResponseModelInstrumentInterest[];
    lstMusicalInterest: HibeatResponseModelMusicalInterest[];

    constructor() {
        this.title = '';
        this.tone =  '';
        this.duration =  '';
        this.bpm =  '';
        this.recordCompany =  '';
        this.urlFile = '';
        this.urlCover =  '';
        this.lstInstrument =  [];
        this.lstMusicalInterest =  [];

    }
}


export class HibeatResponseModelInstrumentInterest {
    id: number;

    constructor() {
        this.id =  0;
    }
}

export class HibeatResponseModelMusicalInterest {
    id: number;

    constructor() {
        this.id =  0;
    }
}
