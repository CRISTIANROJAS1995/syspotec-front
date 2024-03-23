
export class UserResponseSummaryModel {
    identifier: string;
    subscription: UserResponseSummaryModelSubscription;
    gender: UserResponseSummaryModelGender;
    state: UserResponseSummaryModelState;
    name: string;
    userName: string;
    artistName: string;
    email: string;
    nationality: string;
    codeHfa: string;
    codeNationality: string;
    birthDate: Date;
    isVerified: boolean;
    deviceToken: string;
    createdDate: Date;
    updateDate: Date;
    coinAmount: number;
    pointAmount: number;
    isMigration: boolean;
    listImage: UserResponseSummaryModelImage[];

    constructor() {
        this.identifier = '';
        this.subscription = new UserResponseSummaryModelSubscription();
        this.gender = new UserResponseSummaryModelGender();
        this.state = new UserResponseSummaryModelState();
        this.name = '';
        this.userName = '';
        this.artistName = '';
        this.email = '';
        this.nationality = '';
        this.codeHfa = '';
        this.codeNationality = '';
        this.birthDate = new Date();
        this.isVerified = false;
        this.deviceToken = '';
        this.createdDate = new Date();
        this.updateDate = new Date();
        this.coinAmount = 0;
        this.pointAmount = 0;
        this.isMigration = false;
        this.listImage = [];
    }
}

export class UserResponseSummaryModelSubscription {
    id: number;
    typeSubscription: UserResponseSummaryModelTypeSubscription;
    name: string;
    price: number;
    createdDate: Date;
    updateDate: Date;

    constructor() {
        this.id = 0;
        this.typeSubscription = new UserResponseSummaryModelTypeSubscription();
        this.name = '';
        this.price = 0;
        this.createdDate = new Date();
        this.updateDate = new Date();
    }
}

export class UserResponseSummaryModelTypeSubscription {
    id: number;
    name: string;

    constructor() {
        this.id =  0;
        this.name = '';
    }
}

export class UserResponseSummaryModelGender {
    id: number;
    name: string;

    constructor() {
        this.id =  0;
        this.name = '';
    }
}

export class UserResponseSummaryModelState {
    id: number;
    name: string;

    constructor() {
        this.id =  0;
        this.name = '';
    }
}

export class UserResponseSummaryModelImage {
    state: UserResponseSummaryModelState;
    typeImage: UserResponseSummaryModelTypeImage;
    url: string;
    createdDate: Date;
    updateDate: Date;

    constructor() {
        this.state = new UserResponseSummaryModelState();
        this.typeImage = new UserResponseSummaryModelTypeImage();
        this.url = '';
        this.createdDate = new Date();
        this.updateDate = new Date();
    }
}

export class UserResponseSummaryModelTypeImage {
    id: number;
    name: string;

    constructor() {
        this.id =  0;
        this.name = '';
    }
}





