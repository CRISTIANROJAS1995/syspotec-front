import { UserResponseDtoModel } from './user-response-dto-model';

export class ResponseLoginModel {
    result: boolean;
    message?: string;
    data?: ResponseLoginModelData;

    constructor() {
        this.result = false;
        this.message = '';
    }
}

export class ResponseLoginModelData {
    token: string;
    refreshToken: string;
    userData: UserResponseDtoModel;

    constructor() {
        this.token = '';
        this.refreshToken = '';
    }
}
