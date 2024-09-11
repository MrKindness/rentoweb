export class AuthResponse {
    value: String = '';
    result: Boolean = false;

    constructor(value: String, result: boolean) {
        this.value = value;
        this.result = result;
    }
}
  