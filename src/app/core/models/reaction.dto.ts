import { ReactionEnum } from '../enums/reaction.enum';


export class ReactionDto {
  version: number;
  timestampCreated: number;
  deleted: boolean;
  pk: string;
  sk: string;
  owner: string;
  timestampUpdated: string;
  type: ReactionEnum;
  element: { status: any };
  status: string;
}
