export class Transport {
    owner: String = '';
    renter: String = '';
    brand: String = '';
    model: String = '';
    year: String = '';
    location: String = '';
    address: String = '';
    status: String = '';
    description: String = '';
}

export class TransportCreateRequest {
    owner: String = '';
    brand: String = '';
    model: String = '';
    year: String = '';
    location: String = '';
    address: String = '';
    description: String = '';
}

export class TransportsResponse {
    success: boolean = false;
    body: Transport[] = [];

    constructor(success: boolean, body: Transport[]) {
        this.success = success;
        this.body = body;
    }
}
