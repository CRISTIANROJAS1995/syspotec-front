import { ReactionResponseModel } from '../reaction/reaction-response-model';
import { UserResponseSummaryModel } from '../user/user-response-summary-model';
import { HibeatResponseModelStats } from './hibeat-stats-model';

export class HibeatResponseModel {
    identifier: string;
    user: UserResponseSummaryModel;
    state: HibeatResponseModelState;
    title: string;
    tone: string;
    duration: number;
    bpm: string;
    recordCompany: string;
    urlFile: string;
    urlCover: string;
    points: string;
    createdDate: Date;
    updateDate: Date;
    lstInstrument: HibeatResponseModelInstrumentInterest[];
    lstMusicalInterest: HibeatResponseModelMusicalInterest[];
    lstReaction: ReactionResponseModel[];
    stats : HibeatResponseModelStats;

    constructor() {
        this.identifier =  '';
        this.user = new UserResponseSummaryModel();
        this.state =  new HibeatResponseModelState();
        this.title =  '';
        this.tone =  '';
        this.bpm =  '';
        this.duration = 0;
        this.recordCompany =  '';
        this.urlFile =  '';
        this.urlCover =  '';
        this.points =  '';
        this.createdDate = new Date();
        this.updateDate = new Date();
        this.lstInstrument = [];
        this.lstMusicalInterest = [];
        this.lstReaction = [];
        this.stats = new HibeatResponseModelStats();

    }

}



export class HibeatResponseModelState {
    id: number;
    name: string;

    constructor() {
        this.id =  0;
        this.name = '';
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


