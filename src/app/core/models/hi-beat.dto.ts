/* eslint-disable eqeqeq */

import { HibeatStatus } from '../enums/hibeat-status.enum';
import { ReactionEnum } from '../enums/reaction.enum';
import { ReactionDto } from './reaction.dto';

export class HiBeatDto {
  pk: string;
  sk: string;
  bpm: string;
  deleted: boolean;
  listGenders: string[];
  listInstruments: string[];
  owner: string;
  recordCompany: string;
  reproductions: number;
  points: number;
  likes: number;
  shareds: number;
  comments: number;
  status: HibeatStatus;
  hidden: boolean;
  timestampCreated: number;
  timestampUpdated: number;
  title: string;
  tone: string;
  urlHibeat: string;
  urlHibeatPublic: string;
  urlImage: string;
  urlImagePublic: string;
  version: number;
  duration: number;
  reasonDenied: string;
  reasonDescriptionDenied: string;
  listMakingOf?: string[];
  artist: string;
  identityID: string;

  constructor() {
    this.listGenders = [];
    this.listInstruments = [];
    this.pk = '';
    this.sk = '';
    this.bpm = '120';
    this.deleted = false;
    this.owner = '';
    this.recordCompany = '';
    this.status = HibeatStatus.PENDING;
    this.hidden = false;
    this.timestampCreated = 0;
    this.timestampUpdated = 0;
    this.title = '';
    this.tone = '';
    this.urlHibeat = '';
    this.urlHibeatPublic = '';
    this.urlImage = '';
    this.urlImagePublic = '';
    this.version = 0;
    this.duration = 0;
    this.reasonDenied = '';
    this.reasonDescriptionDenied = '';
    this.listMakingOf = [];
    this.artist = '';
    this.identityID = '';
  }

  static calculateReproductions(reactions: ReactionDto[]): number {
    return reactions.filter(reaction => reaction.type === ReactionEnum.reproduction).length;
  }

  static calculateLikes(reactions: ReactionDto[]): number {
    return reactions.filter(reaction => reaction.type === ReactionEnum.like && reaction.element?.status).length;
  }
  static calculateShareds(reactions: ReactionDto[]): number {
    return reactions.filter(reaction => reaction.type === ReactionEnum.share).length;
  }

  static calculateComments(reactions: ReactionDto[]): number {
    return reactions.filter(reaction => reaction.type === ReactionEnum.comment).length;
  }

  static calculatePoints(reactions: ReactionDto[]): number {
    let result = 0;
    let reproductions = 0;
    let likes = 0;
    let shared = 0;
    let comments = 0;
    for (const reaction of reactions) {
      // eslint-disable-next-line eqeqeq
      if (reaction.type == ReactionEnum.reproduction && reaction.element?.status) {
        reproductions += 1;
      // eslint-disable-next-line eqeqeq
      } else if (reaction.type == ReactionEnum.like && reaction.element?.status) {
        likes += 1;
      } else if (reaction.type == ReactionEnum.share && reaction.element.status) {
        shared += 1;
      } else if (reaction.type == ReactionEnum.comment) {
        comments += 1;
      }
    }
    result = reproductions * 10 + likes * 20 + shared * 30;

    return result;
  }

  static getListAnalyticsCountryHb(reactions: ReactionDto[]) {
    const listResult: any = [];
    for (const reaction of reactions) {
      if (reaction.type == 'analytic_country' && reaction.element?.status) {
        listResult.push(reaction.element['status']);
      }
    }

    return listResult;
  }

  static getAnalyticsCountry(reactions: ReactionDto[]) {

    const listResult: any = this.getListAnalyticsCountryHb(reactions);
    const listCountry: any = [];
    const listRepeatCountry: any = [];
    const result: any = [];

    if (listResult) {
      for (const element of listResult) {
        const index = listResult.indexOf(element.trim());
        if (listCountry.includes(element.trim())) {
          listRepeatCountry[index] = listRepeatCountry[index] + 1;
        } else {
          listCountry.push(element);
          listRepeatCountry.push(1);
        }
      }

      for (const country of listCountry) {
        const index = listCountry.indexOf(country);
        const percent = Math.round((listRepeatCountry[index] / listResult.length) * 100);
        if(!Number.isNaN(percent)){
            result.push({ country: `${listCountry[index]}`, value: `${percent}` });
        }

      }
    }

    return result;
  }

  static getListAnalyticsGenderHb(reactions: ReactionDto[]) {
    const listResult: any = [];
    for (const reaction of reactions) {
      if (reaction.type == 'analytic_gender' && reaction.element?.status) {
        listResult.push(reaction.element['status']);
      }
    }

    return listResult;
  }

  static getAnalyticsGender(reactions: ReactionDto[]) {
    const listResult = this.getListAnalyticsGenderHb(reactions);
    const listGender = ['Female', 'Male', 'Non_binary', 'Not_specified'];
    const listRepeatGender = [0, 0, 0, 0];
    const result: any = [];

    if (listResult) {
      for (const gender of listResult) {
        switch (gender) {
          case 'Female':
            listRepeatGender[0] = listRepeatGender[0] + 1;
            break;
          case 'Male':
            listRepeatGender[1] = listRepeatGender[1] + 1;
            break;
          case 'Non_binary':
            listRepeatGender[2] = listRepeatGender[2] + 1;
            break;
          case 'Not_specified':
            listRepeatGender[3] = listRepeatGender[3] + 1;
            break;
        }
      }
    }

    for (const gender of listGender) {
      const index = listGender.indexOf(gender);
      const percent = listRepeatGender[index] == 0 ? 0 : Math.round((listRepeatGender[index] / listResult.length) * 100);
      result.push(percent);
    }

    return result;
  }

  static getListAnalyticsAgeHb(reactions: ReactionDto[]) {
    const listResult: any = [];
    for (const reaction of reactions) {
      if (reaction.type == 'analytic_age' && reaction.element?.status) {
        listResult.push(reaction.element['status']);
      }
    }
    return listResult;
  }

  static getAnalyticsAge(reactions: ReactionDto[]) {
    const listResult = this.getListAnalyticsAgeHb(reactions);
    const listAge = ['0-17', '18-22', '23-27', '28-34', '35-44', '45+'];
    const listRepeatAge = [0, 0, 0, 0, 0, 0];
    const result: any = [];

    if (listResult) {
      for (const age of listResult) {
        // eslint-disable-next-line radix
        const ageAux = parseInt(age);
        if (this.isBetween(ageAux, 0, 17)) {
          listRepeatAge[0] = listRepeatAge[0] + 1;
        } else if (this.isBetween(ageAux, 18, 22)) {
          listRepeatAge[1] = listRepeatAge[1] + 1;
        } else if (this.isBetween(ageAux, 23, 27)) {
          listRepeatAge[2] = listRepeatAge[2] + 1;
        } else if (this.isBetween(ageAux, 28, 34)) {
          listRepeatAge[3] = listRepeatAge[3] + 1;
        } else if (this.isBetween(ageAux, 35, 44)) {
          listRepeatAge[4] = listRepeatAge[4] + 1;
        } else if (ageAux > 45) {
          listRepeatAge[5] = listRepeatAge[5] + 1;
        }
      }
    }

    for (const gender of listAge) {
      const index = listAge.indexOf(gender);
      const percent = listRepeatAge[index] == 0 ? 0 : Math.round((listRepeatAge[index] / listResult.length) * 100);
      result.push(percent);
    }

    return { result, listRepeatAge };
  }

  static isBetween(value: number, min: number, max: number) {
    return value >= min && value <= max;
  }
}
