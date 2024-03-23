

export class UpdateHibeatResponseModel {
    stateId: number;
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
        this.stateId =  0;
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
    name: string;

    constructor() {
        this.id =  0;
        this.name = '';
    }
}

export class HibeatResponseModelMusicalInterest {
    id: number;
    name: string;

    constructor() {
        this.id =  0;
        this.name = '';
    }
}


