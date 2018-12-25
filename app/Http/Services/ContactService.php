<?php

namespace App\Http\Services;

use App\Contact;
use App\Http\Resources\ApiResource;

class ContactService 
{

    public function __construct()
    {
        
    }

    /**
     * Save a contact entity and returns the apiresource result.
     *
     * @param [Contact] $contact
     * @return ApiResource
     */
    public function saveContact($contact)
    {
        $result = new ApiResource();

        $c = is_object($contact) ? $contact : (object)$contact;

        $isNew = is_null($c->contactId) || $c->contactId < 1;

        if($isNew)
            $dto = new Contact;
        else
            $dto = Contact::byContact($c->contactId)->first();

        $dto->client_id = $c->clientId;
        $dto->first_name = $c->firstName;
        $dto->last_name = $c->lastName;
        if(!is_null($c->middleName))
            $dto->middle_name = $c->middleName;
        if(!is_null($c->prefix))
            $dto->prefix = $c->prefix;
        if(!is_null($c->suffix))
            $dto->suffix = $c->suffix;
        if(!is_null($c->ssn))
            $dto->ssn = $c->ssn;
        if(!is_null($c->dob))
            $dto->dob = $c->dob;
        $dto->street = $c->street;
        $dto->street2 = $c->street2;
        $dto->city = $c->city;
        $dto->state = $c->state;
        $dto->zip = $c->zip;
        $dto->phone = $c->phone;
        $dto->email = $c->email;
        $dto->fax = $c->fax;

        $success = $dto->save();

        $result->setStatus($success);
        if($result->hasError)
            return $result;
        return $result->setData($dto);
    }

}