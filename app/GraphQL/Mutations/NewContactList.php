<?php

namespace App\GraphQL\Mutations;

use App\Contact;
use Exception;
use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class NewContactList
{
    /**
     * Return a value for the field.
     *
     * @param  null  $rootValue Usually contains the result returned from the parent field. In this case, it is always `null`.
     * @param  mixed[]  $args The arguments that were passed into the field.
     * @param  \Nuwave\Lighthouse\Support\Contracts\GraphQLContext  $context Arbitrary data that is shared between all fields of a single query.
     * @param  \GraphQL\Type\Definition\ResolveInfo  $resolveInfo Information about the query itself, such as the execution state, the field name, path to the field from the root, and more.
     * @return mixed
     */
    public function resolve($rootValue, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        $dtos = $args['input'];
        $contacts = array();

        $user = Auth::user();
        $user->load('sessionUser');

        DB::beginTransaction();
        try {
            foreach($dtos as $d)
            {
                if (!array_key_exists('client_id', $d)) {
                    $d['client_id'] = $user->sessionClient;
                }
                $contacts[] = Contact::create($d);
            }

            DB::commit();
        } catch (Exception $e) {
            DB::rollback();
        }

        return $contacts;
    }
}
