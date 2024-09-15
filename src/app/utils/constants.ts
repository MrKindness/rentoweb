export class Constants {
    private static readonly apiPath = 'http://localhost:8080/api';

    private static readonly authRoot = this.apiPath + '/auth';
    static readonly authRequest = this.authRoot;
    static readonly registerRequest = this.authRoot + '/register';

    private static readonly userRoot = this.apiPath + '/user';
    static readonly currentUserRequest = this.userRoot;

    static readonly transportRequest = this.apiPath + '/transport';
    static readonly transportsByOwnerRequest = this.transportRequest + '/owner';
    static readonly availableTransportsRequest = this.transportRequest + '/available';
    static readonly rentedTransportsRequest = this.transportRequest + '/rented';
    static readonly rentTransportRequest = this.transportRequest + '/rent';

    static readonly authPage = 'auth';
    static readonly registerPage = 'register';
}
