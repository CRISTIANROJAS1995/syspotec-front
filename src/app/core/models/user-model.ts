export class UserModelCls {
    pk: string;
    sk: string;
    timestampCreated: number;
    timestampUpdated: number;
    deleted: boolean;
    version: number;
    owner: string;
    username: string;
    artistName: string;
    name: string;
    email: string;
    phone: string;
    dialPhone: string;
    birthdate: string;
    gender: string;
    nationality: string;
    codeNationality: string;
    listUrlImages: any[];
    listUrlImagesPublic: any[];
    listInterestSocial: any[];
    listInterestMusical: any[];
    listInterestInstrumental: any[];
    type: string;
    host: string;
    codeHfa: string;
    situation: string;
    hidden: boolean;
    coins: number;
    totalCoins: number;
    biography: UserModelClsBiography;
    motiveUserDeleted: string;
    descriptionUserDeleted: string;
    listMonthlyListeners: any[];
    listComplaints: any[];
    listReferred: any[];
    identityID: string;

    constructor() {
        this.pk = '';
        this.sk = '';
        this.timestampCreated = 0;
        this.timestampUpdated = 0;
        this.deleted = false;
        this.version = 0;
        this.owner = '';
        this.username = '';
        this.artistName = '';
        this.name = '';
        this.email = '';
        this.phone = '';
        this.dialPhone = '';
        this.birthdate = '';
        this.gender = '';
        this.nationality = '';
        this.codeNationality = '';
        this.listUrlImages = [];
        this.listUrlImagesPublic = [];
        this.listInterestSocial = [];
        this.listInterestMusical = [];
        this.listInterestInstrumental = [];
        this.type = '';
        this.host = '';
        this.codeHfa = '';
        this.situation = '';
        this.hidden = false;
        this.coins = 0;
        this.totalCoins = 0;
        this.biography = new UserModelClsBiography();
        this.motiveUserDeleted = '';;
        this.descriptionUserDeleted = '';;
        this.listMonthlyListeners = [];
        this.listComplaints = [];
        this.listReferred = [];
        this.identityID = '';
    }
}

export class UserModelClsBiography {
    biography: string;
    urlInstagram: string;
    urlSpotify: string;
    urlYoutube: string;
    urlSoundcloud: string;
    urlFacebook: string;
    urlWeb: string;

    constructor() {
        this.biography = '';
        this.urlInstagram = '';
        this.urlSpotify = '';
        this.urlYoutube = '';
        this.urlSoundcloud = '';
        this.urlFacebook = '';
        this.urlWeb = '';
    }
}
