
export interface DncContact {
    dncContactId: number,
    clientId:number,
    firstName:string,
    lastName:string,
    description:string,
    address:string,
    addressCont:string,
    city:string,
    state:string,
    zip:string,
    note:string,
    lat: string,
    long: string,
    geocode: string,
}

export interface DncContactRequest {
    dnc_contact_id?: number,
    first_name?: string,
    last_name?: string,
    description?: string,
    address?: string,
    address_cont?: string,
    city?: string,
    state?: string,
    zip?: string,
    note?: string,
    lat?: number,
    long?: number,
    geocode?: string
}
