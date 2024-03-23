export interface UserModel {
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
  biography: Biography;
  motiveUserDeleted: string;
  descriptionUserDeleted: string;
  listMonthlyListeners: any[];
  listComplaints: any[];
  listReferred: any[];
  identityID: string;
}

export interface Biography {
  biography: string;
  urlInstagram: string;
  urlSpotify: string;
  urlYoutube: string;
  urlSoundcloud: string;
  urlFacebook: string;
  urlWeb: string;
}
