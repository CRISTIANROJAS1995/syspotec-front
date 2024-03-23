export class ResponseModel {
    result: boolean;
    message: string;
    data?: any;

    constructor() {
        this.result = false;
        this.message = '';
    }
}
