export class Constants {
    private static readonly apiPath = 'http://localhost:8080/api';

    private static readonly authRoot = this.apiPath + '/auth';
    static readonly authRequest = this.authRoot;
    static readonly registerRequest = this.authRoot + '/register';

    static readonly userRoot = this.apiPath + '/user';
    static readonly updateUserRequest = this.userRoot + '/update';
    static readonly userAdminRequest = this.userRoot + '/admin';

    static readonly transportRequest = this.apiPath + '/transport';
    static readonly transportsByOwnerRequest = this.transportRequest + '/owner';
    static readonly availableTransportsRequest = this.transportRequest + '/available';
    static readonly transportsAdminRequest = this.transportRequest + '/admin';
    static readonly rentedTransportsRequest = this.transportRequest + '/rented';
    static readonly rentTransportRequest = this.transportRequest + '/rent';

    static readonly authPage = 'auth';
    static readonly registerPage = 'register';
}
