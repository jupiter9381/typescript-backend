
export default class ResponseObj {
    public code: number;
    public message: string;

    constructor(code, message, obj?: any) {
        this.code = code;
        this.message = message;
    }

}