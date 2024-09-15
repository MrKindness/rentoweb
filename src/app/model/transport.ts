import { User } from './user';

export class Transport {
    uuid: String = '';
    owner: User = new User();
    renter: User = new User();
    brand: String = '';
    model: String = '';
    year: String = '';
    location: String = '';
    address: String = '';
    status: String = '';
    description: String = '';

    static copy(parent: Transport, target: Transport) {
        target.uuid = parent.uuid;
        target.owner = parent.owner;
        target.renter = parent.renter;
        target.brand = parent.brand;
        target.model = parent.model;
        target.year = parent.year;
        target.location = parent.location;
        target.address = parent.address;
        target.status = parent.status;
        target.description = parent.description;
    }
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

export class TransportUpdateRequest {
    uuid: String = '';
    brand: String = '';
    model: String = '';
    year: String = '';
    location: String = '';
    address: String = '';
    status: String = '';
    description: String = '';

    constructor(transport: Transport) {
        this.uuid = transport.uuid;
        this.brand = transport.brand;
        this.model = transport.model;
        this.year = transport.year;
        this.location = transport.location;
        this.address = transport.address;
        this.status = transport.status;
        this.description = transport.description;
    }
}

export class TransportsResponse {
    success: boolean = false;
    body: Transport[] = [];

    constructor(success: boolean, body: Transport[]) {
        this.success = success;
        this.body = body;
    }
}
