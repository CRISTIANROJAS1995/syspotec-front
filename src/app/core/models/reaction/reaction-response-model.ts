import { UserResponseSummaryModel } from '../user/user-response-summary-model';

export class ReactionResponseModel {
    user: UserResponseSummaryModel;
    typeReaction: ReactionResponseModelType;
    state: ReactionResponseModelState;
    description: string;
    isRead: boolean;
    createdDate: Date;
    updateDate: Date;

    constructor() {
        this.user =  new UserResponseSummaryModel();
        this.typeReaction = new ReactionResponseModelType();
        this.state = new ReactionResponseModelState();
        this.description = '';
        this.isRead = false;
        this.createdDate = new Date();
        this.updateDate = new Date();
    }
}

export class ReactionResponseModelType {
    id: number;
    name: string;
    point: number;

    constructor() {
        this.id =  0;
        this.name = '';
        this.point =  0;
    }
}

export class ReactionResponseModelState {
    id: number;
    name: string;

    constructor() {
        this.id =  0;
        this.name = '';
    }
}

