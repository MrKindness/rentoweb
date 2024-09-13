export class Constants {
    private static readonly apiPath = 'http://localhost:8080/api';

    private static readonly authRoot = this.apiPath + '/auth';
    static readonly authRequest = this.authRoot;
    static readonly registerRequest = this.authRoot + '/register';

    private static readonly userRoot = this.apiPath + '/user';
    static readonly currentUserRequest = this.userRoot;

    private static readonly transportRoot = this.apiPath + '/transport';
    static readonly createTransportRequest = this.transportRoot;
    static readonly transportsByOwnerRequest = this.transportRoot + '/owner';

    static readonly authPage = 'auth';
    static readonly registerPage = 'register';
}
