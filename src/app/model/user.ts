export class User {
    username: String = '';
    name: String = '';
    email: String = '';
    phone: String = '';
    role: String = '';
}

export class UserCreateRequest {
    username: String = '';
    name: String = '';
    email: String = '';
    password: String = '';
}

export class UserResponse {
    success: boolean = false;
    body?: User = new User();

    constructor(success: boolean, body?: User) {
        this.body = body;
        this.success = success;
    }
}
