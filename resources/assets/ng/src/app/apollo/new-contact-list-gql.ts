import { Injectable } from '@angular/core';
import { Mutation } from 'apollo-angular';
import gql from 'graphql-tag';


@Injectable({
    providedIn: 'root'
})
export class NewContactListGQL extends Mutation {
    document = gql`
        mutation newContactList($dtos: [ContactInput!]!) {
            newContactList(input: $dtos) {
                contactId clientId contactType businessName firstName lastName 
                middleName prefix suffix ssn dob street street2 city state zip 
                phoneCountry phone faxCountry fax email
            }
        }
    `;
}
