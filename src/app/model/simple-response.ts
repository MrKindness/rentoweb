export class SimpleResponse {
    success: Boolean = false;
    value: String = '';
    body: any;

    constructor(success: boolean, value: String, body?: any) {
        this.success = success;
        this.value = value;
        this.body = body;
    }
}
