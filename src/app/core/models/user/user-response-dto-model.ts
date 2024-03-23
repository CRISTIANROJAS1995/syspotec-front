import { HibeatResponseModel } from '../hibeat/hibeat-response-model';
import { UserResponseSummaryModel } from './user-response-summary-model';

export class UserResponseDtoModel {
    identifier: string;
    subscription: UserResponseDtoModelSubscription;
    gender: UserResponseDtoModelGender;
    state: UserResponseDtoModelState;
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
    biography: UserResponseDtoModelBiography;
    listBlock: UserResponseDtoModelBlock[];
    listFollow: UserResponseDtoModelFollow[];
    listFollower: UserResponseDtoModelFollower[];
    listImage: UserResponseDtoModelImage[];
    map: UserResponseDtoModelMap;
    lstHibeat: HibeatResponseModel[];

    constructor() {
        this.identifier = '';
        this.subscription = new UserResponseDtoModelSubscription();
        this.gender = new UserResponseDtoModelGender();
        this.state = new UserResponseDtoModelState();
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
        this.biography = new UserResponseDtoModelBiography();
        this.listBlock = [];
        this.listFollow = [];
        this.listFollower = [];
        this.listImage = [];
        this.map = new UserResponseDtoModelMap();
        this.lstHibeat = [];
    }

}

export class UserResponseDtoModelSubscription {
    id: number;
    typeSubscription: UserResponseDtoModelTypeSubscription;
    name: string;
    price: number;
    createdDate: Date;
    updateDate: Date;

    constructor() {
        this.id = 0;
        this.typeSubscription = new UserResponseDtoModelTypeSubscription();
        this.name = '';
        this.price = 0;
        this.createdDate = new Date();
        this.updateDate = new Date();
    }
}

export class UserResponseDtoModelTypeSubscription {
    id: number;
    name: string;

    constructor() {
        this.id =  0;
        this.name = '';
    }
}

export class UserResponseDtoModelGender {
    id: number;
    name: string;

    constructor() {
        this.id =  0;
        this.name = '';
    }
}

export class UserResponseDtoModelState {
    id: number;
    name: string;

    constructor() {
        this.id =  0;
        this.name = '';
    }
}

export class UserResponseDtoModelBiography {
    description: string;
    urlFacebook: string;
    urlInstagram: string;
    urlSoundCloud: string;
    urlSpotify: string;
    urlWeb: string;
    urlYoutube: string;
    createdDate: Date;
    updateDate: Date;

    constructor() {
        this.description =  '';
        this.urlFacebook = '';
        this.urlInstagram = '';
        this.urlSoundCloud = '';
        this.urlSpotify = '';
        this.urlWeb = '';
        this.urlYoutube = '';
        this.createdDate = new Date();
        this.updateDate = new Date();
    }
}

export class UserResponseDtoModelBlock {
    userBlock: UserResponseSummaryModel;
    createdDate: Date;
    updateDate: Date;

    constructor() {
        this.userBlock =  new UserResponseSummaryModel();
        this.createdDate = new Date();
        this.updateDate = new Date();
    }
}

export class UserResponseDtoModelFollow {
    userFollow: UserResponseSummaryModel;
    createdDate: Date;
    updateDate: Date;

    constructor() {
        this.userFollow =  new UserResponseSummaryModel();
        this.createdDate = new Date();
        this.updateDate = new Date();
    }
}

export class UserResponseDtoModelFollower {
    userFollower: UserResponseSummaryModel;
    createdDate: Date;
    updateDate: Date;

    constructor() {
        this.userFollower =  new UserResponseSummaryModel();
        this.createdDate = new Date();
        this.updateDate = new Date();
    }
}

export class UserResponseDtoModelImage {
    state: UserResponseDtoModelState;
    typeImage: UserResponseDtoModelTypeImage;
    url: string;
    createdDate: Date;
    updateDate: Date;

    constructor() {
        this.state = new UserResponseDtoModelState();
        this.typeImage = new UserResponseDtoModelTypeImage();
        this.url = '';
        this.createdDate = new Date();
        this.updateDate = new Date();
    }
}

export class UserResponseDtoModelTypeImage {
    id: number;
    name: string;

    constructor() {
        this.id =  0;
        this.name = '';
    }
}


export class UserResponseDtoModelMap {
    state: UserResponseDtoModelState;
    latitude: string;
    longitude: string;
    createdDate: Date;
    updateDate: Date;
    location: string;

    constructor() {
        this.state = new UserResponseDtoModelState();
        this.latitude = '';
        this.longitude = '';
        this.createdDate = new Date();
        this.updateDate = new Date();
        this.location = '';
    }
}



