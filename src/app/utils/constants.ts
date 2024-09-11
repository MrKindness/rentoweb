export class Constants {
    private static readonly apiPath = 'http://localhost:8080/api';

    private static readonly authRoot = this.apiPath + '/auth';
    static readonly authRequest  = this.authRoot;
    static readonly registerRequest = this.authRoot + '/register';

    private static readonly userRoot = this.apiPath + '/user';
    static readonly currentUserRequest = this.userRoot;

    static readonly authPage = 'auth';
    static readonly registerPage = 'register';

    static readonly errorDialogTitle = 'Error';
    static readonly successDialogTitle = 'Success';
}
