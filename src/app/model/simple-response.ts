export class SimpleResponse {
    success: Boolean = false;
    value: String = '';

    constructor(success: boolean, value: String) {
        this.success = success;
        this.value = value;
    }
}
